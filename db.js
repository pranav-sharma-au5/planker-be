const Sequelize = require("sequelize")

const postgres = new Sequelize('planker', 'postgres', 'kuchbhi1', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

try {
  postgres.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
postgres.sync(
  // { force: true }
)
module.exports = postgres