const express = require ("express");
const mongoose = require ("mongoose");
const router = express.Router();
const Board = require ("../models/Boards");

router.get("/", (request, response) => {
    Board.find({},(error,boards) => {
        if (error){
            response.sendStatus(400).json ("Bad Request!")
            throw error
        }
        response.json(boards);
    } )



});

router.get("/:board_id", (request, response) => {


    Board.findOne({board_id: request.params.board_id},(error,board) => {
    if (error){
        response.sendStatus(400).json ("Bad Request!")
        throw error
    }
    response.json(board);
});

});

router.post("/", (request, response) => {
    console.log (request.body)
    let newBoard = new Board(
        {

        board_id: request.body.board_id,
        type: request.body.type,
        location: request.body.location
    })
    newBoard
    .save()
    .then((board)=> response.json(newBoard))
    .catch ((error)=> response.send(error))
    //.catch ((error)=> response.sendStatus(400).json ())
})

router.delete("/:board_id",(request,response) => {
    let board_id = request.params.board_id;
    Board.findOneAndDelete ({board_id:board_id} , (error, board)=>{
        if (error){
            response.sendStatus(404).json ("Board Not Found!")
            throw error
        }
        response.json(board)  
    })

});

router.put("/:board_id",(request, response) => {

    let board_id = request.params.board_id;
    Board.findOneAndUpdate ({board_id}, {

        $set: request.body
        
    }, (error,board) => {

        if (error){
            response.sendStatus(400).json ("Bad Request!")
            throw error
        }
        response.json("Board Updated Successfully!")    
    })

        
  
})

module.exports = router;