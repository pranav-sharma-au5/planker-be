var express = require('express');
var router = express.Router();
const { User, BoardMember } = require("../models/User")
const jwt = require("jsonwebtoken")
const privateKey = "asdsvasdfadsfadf"
const checkInvite = require("../middlewares/boardJwt")

/* GET users listing. */
router.post('/signup', checkInvite, async (req, res) => {
  try {
    const { email, password, name, boardToken } = req.body
    let user = await User.create({ email, password, name }, {
      returning: true,
      plain: true
    })
    user = user.toJSON()
    console.log(user)
    const token = jwt.sign(user, privateKey)
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 })
    res.status(200).send({ status: 200, valid: true })
    if (boardToken) {
      const userId = user.id
      const { boardId } = boardToken
      console.log({ boardId, userId })
      BoardMember.findOrCreate({ where: { boardId, userId }, defaults: { boardId, userId } })
    }
  } catch (error) {
    res.status(400).send("invalid request")
  }
});

router.post('/', checkInvite, async (req, res) => {
  try {
    const { email, password, boardToken } = req.body
    let user = await User.findOne({ where: { email } })
    user = user.toJSON()
    if (user.password === password) {

      const token = jwt.sign(user, privateKey)
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 })
      const userId = user.id
      if (boardToken) {
        const { boardId } = boardToken
        console.log({ boardId, userId })
        BoardMember.findOrCreate({ where: { boardId, userId }, defaults: { boardId, userId } })
      }
      res.status(200).send({ status: 200, valid: true })
    }
    else {
      res.status(409).send({ status: 409, valid: false, message: "invalid credentials" })

    }
  }
  catch{
    res.status(200).send({ status: 409, valid: false, message: "bad request" })
  }
});


module.exports = router;
