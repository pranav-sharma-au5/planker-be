var express = require('express');
var router = express.Router();
const usersRouter = require("./users")
const boardsRouter = require("./boards")
const listsRouter = require("./lists")
const cardsRouter = require("./cards")
const { BoardMember } = require("../models/User")
const dragRouter = require("./drag")
const authenticate = require("../middlewares/jwt")
const inviteController = require("../Controllers/invite")
const checkInvite = require("../middlewares/boardJwt")


/* GET home page. */
router.use('/users', usersRouter);
router.post('/login', checkInvite, authenticate, async function (req, res) {
  const { boardToken, userId } = req.body
  let boardId
  if (boardToken) {
    boardId = boardToken.boardId
    await BoardMember.findOrCreate({ where: { boardId, userId }, defaults: { boardId, userId } })
  }
  if (req.body.user) {
    res.status(200).send({ status: 200, valid: true, boardId })
  }
});

router.get("/invite/:boardId", authenticate, inviteController)

router.use('/boards', authenticate, boardsRouter);
router.use('/lists', authenticate, listsRouter);
router.use('/cards', authenticate, cardsRouter);
router.use('/drag', authenticate, dragRouter);


module.exports = router;
