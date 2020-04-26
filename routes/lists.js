var express = require('express');
var router = express.Router();
const List = require("../models/List")
const { Card } = require("../models/Card")
const sequelize = require("../db")
const { QueryTypes } = require('sequelize');

router.post('/', async (req, res) => {
  const { boardId, title, index } = req.body
  const list = await List.create({ boardId, title, index: index })
  res.send(list)
});


router.get("/:boardId", async (req, res) => {
  const { boardId } = req.params
  await List.sync()
  const lists = await List.findAll({
    where: { boardId },
    include: [{ model: Card, include: ["labels", "checklist", "members"] }],
    order: [
      ['index'],
      [Card, 'index']
    ],
  })
  res.send(lists)
})

router.delete("/", async (req, res) => {
  const { listId, boardId, index } = req.query
  console.log({ listId, boardId, index })
  const lists = await List.destroy({ where: { id: listId } })
  await sequelize.query(
    `UPDATE lists 
      SET index = index - 1 
      WHERE "boardId" = ${boardId} 
      AND index >${index}`,
    { type: QueryTypes.SELECT });
  res.send("deleted")
})


router.put("/:listId", async (req, res) => {
  const { listId } = req.params
  const { value, index } = req.body
  const lists = await List.update({ title: value }, { where: { id: listId } })
  res.send("updated")
})


module.exports = router;
