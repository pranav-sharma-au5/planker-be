const sequelize = require("../db")
const { DataTypes } = require("sequelize")
const Label = require("./Label")

const Card = sequelize.define("cards", {

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  dueDate: {
    type: DataTypes.DATE
  },
  index: {
    type: DataTypes.INTEGER,
    allowNull: false

  }


}, {
  timestamps: false
})
const CardLabel = sequelize.define("cardlabels", {}, { timestamps: false })


Card.belongsToMany(Label, { through: "cardlabels", as: "labels" })
Label.belongsToMany(Card, { through: "cardlabels" })
CardLabel.hasMany(Card)
Card.belongsTo(CardLabel)
CardLabel.hasMany(Label)
Label.belongsTo(CardLabel)





module.exports = { Card, CardLabel }
