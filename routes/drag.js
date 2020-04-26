var express = require('express');
var router = express.Router();
const { sortCardsController, sortListsController } = require("../Controllers/sortCards")

router.put("/cards", sortCardsController)
router.put("/lists", sortListsController)




module.exports = router