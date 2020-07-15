const express = require ("express");
const mongoose = require ("mongoose");
const router = express.Router();


const Notice = require ("../models/Notices");

router.get("/", (request, response) => {
    Notice.find({approved:true},(error,notices) => {
        if (error){
            response.sendStatus(400).json ("Bad Request!")
            throw error
        }
        response.json(notices);
    } )
    //response.json(objectCarList);



});

router.get("/reviewNotices", (request, response) => {
    Notice.find({approved:false},(error,notices) => {
        if (error){
            response.sendStatus(400).json ("Bad Request!")
            throw error
        }
        response.json(notices);
    } )

});


router.get("/ledNotices", (request, response) => {
    Notice.find({approved:true},(error,notices) => {
        if (error){
            response.sendStatus(400).json ("Bad Request!")
            throw error
        }
        response.json(notices);
    } )

});

router.get("/lcdNotices", (request, response) => {
    Notice.find({approved:true},(error,notices) => {
        if (error){
            response.sendStatus(400).json ("Bad Request!")
            throw error
        }
        response.json(notices);
    } )

});

router.get("/:notice_id", (request, response) => {
    

Notice.findOne({notice_id: request.params.notice_id},(error,notice) => {
    if (error){
        response.sendStatus(400).json ("Bad Request!")
        throw error
    }
    response.json(notice);
});

});

router.post("/", (request, response) => {
    console.log (request.body)
    let newNotice = new Notice(
        {

        notice_id: request.body.notice_id,
        user:request.body.user,
        image: request.body.image,
        audio: request.body.audio,
        title: request.body.title,
        body:request.body.body,
        startDate: request.body.startDate,
        stopDate: request.body.stopDate,
        location: request.body.location
    
    })
    newNotice
    .save()
    .then((notice)=> response.json(newNotice))
    .catch ((error)=> response.sendStatus(400).json ())

})

router.delete("/:notice_id",(request,response) => {
    let notice_id = request.params.notice_id;
    Notice.findOneAndDelete ({notice_id:notice_id} , (error, notice)=>{
        if (error){
            response.sendStatus(404).json ("Notice Not Found!")
            throw error
        }
        response.json(notice)    
    })

});

router.put("/:notice_id",(request, response) => {

    let notice_id = request.params.notice_id;
    Notice.findOneAndUpdate ({notice_id}, {
        $set: request.body
            
    }, (error,notice) => {

        if (error){
            response.sendStatus(400).json ("Bad Request!")
            throw error
        }
        response.json("Notice Updated Successfully!")    
    })

        
  
})

module.exports = router;