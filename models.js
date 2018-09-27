const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'project-3', 
  dialect: 'postgres'
});


// Create models here

const Users = sequelize.define('users', {
  name: Sequelize.TEXT,
  userName: Sequelize.VARCHAR(50),
  password: Sequelize.TEXT,
  pictureSrc: Sequelize.TEXT,
  email: Sequelize.TEXT,
  city: sequelize.TEXT
});

const Albums = sequelize.define('album', {
  title: Sequelize.TEXT,
  artist: Sequelize.TEXT,
  releaseYear: Sequelize.INTEGER,
  genre: Sequelize.TEXT,
  coverPictureSrc: Sequelize.TEXT,
  rating: Sequelize.INTEGER,
  description: Sequelize.TEXT
});

const UserAlbums = sequelize.define('userAlbums');

Users.belongToMany(Albums, { through: UserAlbums});
Albums.belongToMnay(Users, { through: UserAlbums});

module.exports = {
  // Export models
  Users,
  Albums,
  UaserAlbums,
  sequelize: sequelize
};
