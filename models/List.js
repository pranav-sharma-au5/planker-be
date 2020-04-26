const sequelize = require("../db")
const { DataTypes } = require("sequelize")
const { Card } = require("./Card")
const { User } = require("./User")

const List = sequelize.define("lists", {

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  timestamps: false
})

List.hasMany(Card, { onDelete: 'cascade' })
Card.belongsTo(List)


module.exports = List