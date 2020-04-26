const Sequelize = require("sequelize")

const postgres = new Sequelize("postgres://eyevtkpd:Y329qMTaMGsbu8W1olggRkZIdxF_U9mY@drona.db.elephantsql.com:5432/eyevtkpd", { logging: false });

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