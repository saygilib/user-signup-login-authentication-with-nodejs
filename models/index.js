const databaseConfig = require("../config/config");
const Sequelize = require("sequelize");
const sequelizeInstance = new Sequelize(
  databaseConfig.DB,
  databaseConfig.USER,
  databaseConfig.PASSWORD,
  {
    host: databaseConfig.HOST,
    dialect: databaseConfig.dialect,
    

    pool: {
      max: databaseConfig.pool.max,
      min: databaseConfig.pool.min,
      acquire: databaseConfig.pool.acquire,
      idle: databaseConfig.pool.idle,
    },
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

db.user = require("./user.js")(sequelizeInstance, Sequelize);

module.exports = db;
