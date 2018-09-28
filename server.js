const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Album, UserAlbums } = require('./models');
const PORT = process.env.PORT || 5678;

const app = express();

app.use(bodyParser.json());

const jwtSecret = 'secret189230';

app.get('/api/albums', async (req, res) => {
  const allAlbums = await Album.findAll({});
  res.json(allAlbums);
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required for registration' });
    return;
  }

  const existingUser = await User.findOne({
    where: {
      username: username
    }
  });

  if (existingUser) {
    res.status(409).json({ message: 'This username already exists' });
  } else {
    const passwordDigest = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username: username,
      passwordDigest: passwordDigest
    });
  
    const token = jwt.sign({ userId: newUser.id }, jwtSecret);
    res.json({ token: token });
  }  
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      username: username
    }
  });

  if (!user) {
    res.status(401).json({ message: 'Username or password invalid' });
    return
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordDigest)

  if (isPasswordCorrect) {
    const token = jwt.sign({ userId: user.id }, jwtSecret);
    res.json({ token: token });
  } else {
    res.status(401).json({ message: 'Username or password invalid' });
    return
  }

});

app.get('/api/current-user', async (req, res) => {
  const token = req.headers['jwt-token'];
  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  const user = await User.findOne({
    where: {
      id: tokenData.userId
    }
  });
  res.json(user);
});

app.post('/api/current-user/albums', async (req, res) => {
  const { albumId } = req.body;
  const token = req.headers['jwt-token'];
  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  const user = await User.findOne({
    where: {
      id: tokenData.userId
    }
  });
  const album = await Album.findOne({
    where: {
      id: albumId,
    }
  })
  user.addAlbum(album);
  res.sendStatus(201);
});

app.get('/api/current-user/albums', async (req, res) => {
  const token = req.headers['jwt-token'];
  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  const user = await User.findOne({
    where: {
      id: tokenData.userId
    }
  });
  const userAlbums = await Album.findAll({
    include: [
      {
        model: User,
        where: {
          id: user.id
        },
        attributes: []
      },
    ],
  });
  res.json(userAlbums);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
