const express = require ("express");
const mongoose = require ("mongoose");
const User = require ("../models/Users");
const { request, response } = require("express");

const router = express.Router();

router.post("/login", (request, response) => {
    let email = request.body.email;
    let pass = request.body.password;

    if ( email == "" || pass == "" ){
        response.sendStatus(400);
    } else {
        User.findOne({email_address: email}, (err, user) =>{
            //if (err) throw err;

            if (user.password == pass) {
                response.json({success: true})
            } else {
                response.sendStatus(400)//.json({success: false})
            }
        })
    }
})

router.get("/", (request, response) => {
    User.find({},(error,users) => {
        if (error){
            response.sendStatus(400).json ("Bad Request!")
            throw error
        }
        response.json(users);
    } )



});

router.get("/:user_id", (request, response) => {
    

User.findOne({user_id: request.params.user_id},(error,user) => {
    if (error){
        response.sendStatus(400).json ("Bad Request!")
        throw error
    }
    response.json(user);
});
});

router.get("/name/:name", (request, response) => {
    
console.log(request.params.name)
    User.findOne({name: request.params.name},(error,user) => {
        if (error){
            response.sendStatus(400).json ("Bad Request!")
            throw error
        }
        response.json(user);
    });
});



router.post("/", (request, response) => {
    console.log (request.body)
    let newUser = new User(
        {
        user_id: request.body.user_id,
        name:request.body.name,
        email_address: request.body.email_address,
        password: request.body.password,
        admin: request.body.admin,
        location_accessible: request.body.location_accessible
    })
    newUser
    .save()
    .then((user)=> response.json(newUser))
    .catch ((error)=> response.send(error))
   // .catch ((error)=> response.sendStatus(400).json ())

})

router.delete("/:user_id",(request,response) => {
    let user_id = request.params.user_id;
    User.findOneAndDelete ({user_id:user_id} , (error, user)=>{
        if (error){
            response.sendStatus(404).json ("User Not Found!")
            throw error
        }
        response.json(user)    
    })

});

router.put("/:user_id",(request, response) => {

    let user_id = request.params.user_id;
    User.findOneAndUpdate ({user_id}, {

        $set: request.body
        
    }, (error,notice) => {

        if (error){
            response.sendStatus(400).json ("Bad Request!")
            throw error
        }
        response.json("User Updated Successfully!")    
    })

        
  
})

module.exports = router;
