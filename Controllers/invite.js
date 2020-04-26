const jwt = require("jsonwebtoken")

module.exports = async (req, res) => {
  // try {
  const { boardId } = req.params
  const { userId } = req.body

  const token = jwt.sign({ boardId, userId }, "inviteToken")

  res.send({ status: 200, token })

  // } catch (error) {
  //   console.log(error)
  //   res.status(400).send({ status: 400 })
  // }

}