const express = require("express");
const router = express.Router();

const Contact = require("../models/contacts");

//retrieving contacts
router.get('/contacts', (req, res, next)=>{
    //res.send("<h1>Retrieving the contact list</h1>");
    Contact.find(function(err, contacts){
        res.json(contacts);
    });
});

//add contact
router.post('/contact', (req, res, next)=>{
    //logic to add contact
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone 
    });

    newContact.save((err, contact)=>{
        if(err){
            //console.log(err);
            //res.json(err);            
            res.json({msg: 'Failed to add contact'});
        } else{
            res.json({msg: 'contact added successfully'});
        }
    });
});

//delete contacts
router.delete('/contact/:id', (req, res, next)=>{
    //logic to add contact
    Contact.deleteMany({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        } else{
            res.json(result);
        }
    });
});


//whenever you are creating a route need to exporting a route
module.exports = router; 