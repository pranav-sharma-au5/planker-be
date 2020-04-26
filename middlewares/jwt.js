const privateKey = "asdsvasdfadsfadf"
const jwt = require("jsonwebtoken")
const { User } = require("../models/User")
async function checkJwt(req, res, next) {
  try {
    token = req.headers.cookie.split('jwt=')[1]
    const decoded = await jwt.verify(token, privateKey)
    const userId = decoded.id

    let user = await User.findOne({ where: { id: userId } })
    user = user.toJSON()
    req.body.userId = user.id
    req.body.user = user
    next()



  } catch (error) {
    res.status(403).send({ status: 403, valid: false, message: "invalid credentials" })
  }
}

module.exports = checkJwt