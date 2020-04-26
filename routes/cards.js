var express = require('express');
var router = express.Router();
const List = require("../models/List")
const { Card, CardLabel } = require("../models/Card")
const { CardMember } = require("../models/User")
const CheckList = require("../models/CheckList")
const sequelize = require("../db")
const { QueryTypes } = require('sequelize');

router.post('/', async (req, res) => {
  const { listId, title, index } = req.body
  const card = await Card.create({ listId, title, index: index })
  res.status(200).send({
    status: 200,
    data: card,
    message: "card created"
  })
});


router.get("/:listId", async (req, res) => {
  const { listId } = req.params
  const cards = await Card.findAll({ where: { listId }, include: ['labels', "checklist", "members"], order: ['index'] })
  res.send(cards)
})

router.delete("/", async (req, res) => {
  const { cardId, listId, index } = req.query
  const card = await Card.destroy({ where: { id: cardId } })
  await sequelize.query(
    `UPDATE cards 
      SET index = index - 1 
      WHERE "listId" = ${listId} 
      AND index >${index}`,
    { type: QueryTypes.SELECT });
  res.send("deleted")
})

router.put("/:cardId", async (req, res) => {
  const { cardId } = req.params
  const { card, card: { members, labels, checklist } } = req.body
  CardLabel.destroy({ where: { cardId } })
  CardMember.destroy({ where: { cardId } })
  CheckList.destroy({ where: { cardId } })
  const labelQuery = labels.map(async el => {
    return await CardLabel.create({ cardId, labelId: el.id })
    // return await CardLabel.findOrCreate({ where: { cardId, labelId: el.id }, defaults: { cardId, labelId: el.id } })
  })
  const memberQuery = members.map(async el => {
    return await CardMember.create({ cardId, userId: el.id })
  })
  const checkListQuery = checklist.map(async el => {
    return await CheckList.create({ cardId, ...el })
  })
  await Promise.all(labelQuery)
  await Promise.all(memberQuery)
  await Promise.all(checkListQuery)
  const { title, description, dueDate, index, listId } = card
  console.log({ title, description, dueDate, index, listId })
  await Card.update({ title, description, dueDate, index, listId }, { where: { id: cardId } })
  res.send("updated")
})




module.exports = router;
