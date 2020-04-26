const sequelize = require("../db")
const { DataTypes } = require("sequelize")
const List = require("./List")
const Label = require("./Label")
const { User } = require("./User")

const Board = sequelize.define("boards", {

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  backgroundUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }

}, {
  timestamps: false
})

Board.hasMany(List)
List.belongsTo(Board)
Board.hasMany(Label)
Label.belongsTo(Board)



module.exports = Board