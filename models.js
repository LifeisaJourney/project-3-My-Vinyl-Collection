const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'project-3',
  dialect: 'postgres'
});

// Create models here
const User = sequelize.define('users', {
  name: Sequelize.TEXT,
  userName: Sequelize.VARCHAR(50),
  password: Sequelize.TEXT,
  pictureSrc: Sequelize.TEXT,
  email: Sequelize.TEXT,
  city: Sequelize.TEXT
});

const Album = sequelize.define('album', {
  title: Sequelize.TEXT,
  artist: Sequelize.TEXT,
  releaseYear: Sequelize.INTEGER,
  genre: Sequelize.TEXT,
  coverPictureSrc: Sequelize.TEXT,
  rating: Sequelize.INTEGER,
  description: Sequelize.TEXT
});

const UserAlbums = sequelize.define('userAlbums');
User.belongsToMany(Album, { through: UserAlbums });
Album.belongsToMany(User, { through: UserAlbums });

// Export models
module.exports = {
  User,
  Album,
  UserAlbums,
  sequelize: sequelize
};
