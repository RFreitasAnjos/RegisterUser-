const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  database: process.env.DB_NAME || "registeruser",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345678",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
});
const connection = async () => {
  const db_name = sequelize.database;

  try {
    const [results] = await sequelize.query(
      `SHOW DATABASES LIKE '${db_name}';`
    );
    if (results.length === 0) {
      console.log(`Database '${db_name}' doesn't exist. creating...`);
      await sequelize.query(`CREATE DATABASE ${db_name};`);
      console.log(`Database '${db_name}' created suceesfully.`);
    } else {
      console.log(`Database '${db_name}' already exists.`);
    }
    sequelize.options.database = db_name;

    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Failed Connection", error);
  }
};

connection();
module.exports = sequelize;
