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












app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
