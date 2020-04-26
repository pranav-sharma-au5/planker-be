const jwt = require("jsonwebtoken")
const Board = require("../models/Board")
async function checkJwt(req, res, next) {
  // try {
  const token = req.body.boardToken
  if (!token) {
    next()
    return
  }
  const decoded = await jwt.verify(token, 'inviteToken')
  console.log(decoded)

  const { boardId, userId } = decoded
  let board = await Board.findOne({ where: { id: boardId, userId } })
  board = board.toJSON()
  req.body.boardToken = { boardId }
  next()



  // } catch (error) {
  //   res.status(403).send({ status: 403, valid: false, message: "invalid board" })
  // }
}

module.exports = checkJwt