const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Album, UserAlbums} = require('./models');
const PORT = process.env.PORT || 5678;

const app = express();

app.use(bodyParser.json());

const jwtSecret = 'secret189230';

app.get('/api/albums', async(req,res) => {
  const allAlbums = await Album.findAll({});
  res.json(allAlbums);
});

app.post('/api/register', async(req,res) => {
  const {username, password} = req.body;
  if(!username || !password){
    res.status(401).json({error: 'Username and password are required for registration'});
    return;
  }

  const existingUser = await User.findOne({
    where: {
      username: username
    }
  });
  if (existingUser){
    res.status(409).json({error: 'This username already exists'});
    return;
  }

  const passwordDigest = bcrypt.hash(password, 12);

  const newUser = await User.create({
    username: username,
    password: passwordDigest
  });

  const token = jwt.sign({userId:newUser.id}, jwtSecret);
  res.json({token: token});
});




app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
