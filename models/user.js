module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      minLength: 6,
    },

    name: {
      type: Sequelize.STRING,
      required: true,
    },
    surname: {
      type: Sequelize.STRING,
      required: true,
    },
  });

  return user;
};



