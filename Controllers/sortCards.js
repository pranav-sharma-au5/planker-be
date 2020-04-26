const { Card } = require("../models/Card")
const List = require("../models/List")
const { QueryTypes } = require('sequelize');
const sequelize = require("../db")
module.exports = {
  sortCardsController: async (req, res) => {

    const {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId
    } = req.body
    //same list card drag
    const id = parseInt(draggableId.split("-")[1])

    if (droppableIdStart === droppableIdEnd) {
      const listId = parseInt(draggableId.split("-")[3])
      await sequelize.query(
        `UPDATE cards 
    SET index = index - 1 
    WHERE "listId" = ${listId} 
    AND index >${droppableIndexStart} 
    AND index <=${droppableIndexEnd} `,
        { type: QueryTypes.SELECT });

      await sequelize.query(
        `UPDATE cards 
      SET index = index + 1 
      WHERE "listId" = ${listId} 
      AND index <${droppableIndexStart} 
      AND index >=${droppableIndexEnd} `,
        { type: QueryTypes.SELECT });

      await Card.update({ index: droppableIndexEnd }, { where: { id } })

    }
    else {//different list
      const startListId = parseInt(droppableIdStart.split("-")[3])
      const endListId = parseInt(droppableIdEnd.split("-")[3])
      await sequelize.query(
        `UPDATE cards 
        SET index = index - 1 
        WHERE "listId" = ${startListId} 
        AND index >${droppableIndexStart}`,
        { type: QueryTypes.SELECT });

      await sequelize.query(
        `UPDATE cards 
        SET index = index + 1 
        WHERE "listId" = ${endListId} 
        AND index >=${droppableIndexEnd} `,
        { type: QueryTypes.SELECT });
      await Card.update({ index: droppableIndexEnd, listId: endListId }, { where: { id } })
    }

    res.send("done")



  },

  sortListsController: async (req, res) => {
    const {
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId
    } = req.body

    const id = parseInt(draggableId.split("-")[3])
    const boardId = parseInt(droppableIdEnd.split("#")[1])
    console.log(droppableIndexStart, droppableIndexEnd, boardId)
    await sequelize.query(
      `UPDATE lists 
        SET index = index - 1 
        WHERE "boardId" = ${boardId} 
        AND index >${droppableIndexStart} 
        AND index <=${droppableIndexEnd} `,
      { type: QueryTypes.SELECT });

    await sequelize.query(
      `UPDATE lists 
        SET index = index + 1 
        WHERE "boardId" = ${boardId} 
        AND index <${droppableIndexStart} 
        AND index >=${droppableIndexEnd} `,
      { type: QueryTypes.SELECT });

    await List.update({ index: droppableIndexEnd }, { where: { id } })
    res.send("done")
  }
}