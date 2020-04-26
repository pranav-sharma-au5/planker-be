const sequelize = require("../db")
const { DataTypes } = require("sequelize")
const Label = sequelize.define("labels", {

  title: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING
  }
}, {
  timestamps: false
})

module.exports = Label