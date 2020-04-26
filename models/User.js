const sequelize = require("../db")
const { DataTypes } = require("sequelize")
const Board = require("./Board")
const { Card } = require("./Card")

const User = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  timestamps: false
})

const BoardMember = sequelize.define("boardmembers", {}, { timestamps: false })
const CardMember = sequelize.define("cardmembers", {}, { timestamps: false })

Card.belongsToMany(User, { through: "cardmembers", as: 'members' })
User.belongsToMany(Card, { through: "cardmembers" })
CardMember.hasMany(Card)
Card.belongsTo(CardMember)
CardMember.hasMany(User)
User.belongsTo(CardMember)


Board.belongsToMany(User, { through: "boardmembers", as: 'boardMembers' })
User.belongsToMany(Board, { through: "boardmembers" })
BoardMember.hasMany(Board)
Board.belongsTo(BoardMember)
BoardMember.hasMany(User)
User.belongsTo(BoardMember)

User.hasMany(Board, { onDelete: 'cascade' })
Board.belongsTo(User)


module.exports = { User, BoardMember, CardMember }