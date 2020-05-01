var express = require('express');
var router = express.Router();
const Board = require("../models/Board")
const Label = require("../models/Label")
const { User, BoardMember } = require("../models/User")
const jwt = require("jsonwebtoken")
const boardLabels = ["#1a1334", "#26294a", "#01545a", "#017351", "#03c383", "#aad962", "#fbbf45", "#ef6a32", "#ed0345", "#a12a5e", "#710162", "#022c7d"]
const List = require("../models/List")

router.get("/", async (req, res) => {
  const { userId } = req.body
  const boards = await Board.findAll({
    include: [
      {
        model: User,
        as: "boardMembers",
        attributes: ['name', 'id'],
        where: { id: userId }
      },
      {
        model: Label,
        as: "labels",
        attributes: ['color', 'id']
      }
    ]
  })
  res.send(boards)
})

router.post('/', async (req, res) => {
  try {
    const { title, backgroundUrl, userId } = req.body
    let board = await Board.create({ title, backgroundUrl, userId })
    board = board.toJSON()
    boardId = board.id
    await BoardMember.create({ boardId, userId })
    const boards = await Board.findAll({
      include: [
        {
          model: User,
          as: "boardMembers",
          attributes: ['name', 'id'],
          where: { id: userId }
        },
        {
          model: Label,
          as: "labels",
          attributes: ['color', 'id']
        }
      ]
    })
    res.status(200).send(boards)
    boardId = board.id
    boardLabels.forEach(color => Label.create({ boardId, color }))
    await List.create({ boardId, title: "Backlog", index: 0 })
    await List.create({ boardId, title: "To-do", index: 1 })
    await List.create({ boardId, title: "Done", index: 2 })
  }
  catch{
    res.status(409).send({ status: 409, valid: false, message: "bad request" })
  }
});



router.post("/:boardId", async (req, res) => {
  const { boardId } = req.params
  const { backgroundUrl } = req.body
  console.log(boardId, backgroundUrl)
  let board = await Board.update({ backgroundUrl }, { where: { id: boardId } })
  res.send("board updated")
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const boards = await Board.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: "boardMembers",
        attributes: ['name', 'id']
      },
      {
        model: Label,
        as: "labels",
        attributes: ['color', 'id']
      }
    ]
  })
  res.send(boards)
})

router.delete("/:boardId", async (req, res) => {
  const { boardId } = req.params
  const { userId } = req.body
  let board = await Board.findOne({ where: { id: boardId } })

  console.log(board, userId)
  if (board.userId == userId) {
    await Board.destroy({ where: { id: boardId } })
  }
  else {
    await BoardMember.destroy({ where: { boardId: id, userId } })
  }

  res.send("deleted")

})


module.exports = router;
