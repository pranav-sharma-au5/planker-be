const sequelize = require("../db")
const { DataTypes } = require("sequelize")
const { Card } = require("./Card")

const CheckListItem = sequelize.define("checklistitems", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

Card.hasMany(CheckListItem, { as: "checklist", onDelete: 'cascade' })
CheckListItem.belongsTo(Card)



module.exports = CheckListItem 