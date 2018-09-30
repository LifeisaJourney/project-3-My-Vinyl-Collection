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
  const { username, password, name, email, pictureSrc, city } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: 'Username and password are required for registration' });
    return;
  }

  const existingUser = await User.findOne({
    where: {
      $and:[{
        username: username,
      }]
      
    }
  });

  if (existingUser) {
    res.status(409).json({ message: 'This username and password already exists' });
    return;
  } else {
    const passwordDigest = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name: name,
      username: username,
      passwordDigest: passwordDigest,
      email: email,
      pictureSrc: pictureSrc,
      city: city
    });
  
    const token = jwt.sign({ userId: newUser.id }, jwtSecret);
    res.json({ token: token });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    response.status(400).json({
      error: "Login requires a username and password in the request body."
    });
    return;
  }
  const user = await User.findOne({
    where: {
      username: username
    }
  });

  if (!user) {
    res.status(401).json({ message: 'Username or password invalid' });
    return;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordDigest)

  if (isPasswordCorrect) {
    const token = jwt.sign({ userId: user.id }, jwtSecret);
    res.json({ token: token });
  } else {
    res.status(401).json({ message: 'Username or password invalid' });
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
  const token = req.headers['jwt-token'];

  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  const { albumId } = req.body;
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

app.delete('/api/current-user/albums', async (req, res) => {
  const token = req.headers['jwt-token'];
  let tokenData;
  try {
    tokenData = jwt.verify(token, jwtSecret);
  } catch (e) {
    console.log(e);
  }
  const { albumId } = req.body;
  const user = await User.findOne({
    where: {
      id: tokenData.userId
    }
  });

  await UserAlbums.destroy({
    where: {
      $and: [
        { albumId: albumId },
        { userId: user.id },
      ]
    }
  });
  res.sendStatus(200);
});

app.get('api/albums/:id', async(req,res) => {
  const { albumId } = req.params;
  const album = await Album.findOne({
    where:{
      id: albumId
    }
  });
  res.json(album);
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
