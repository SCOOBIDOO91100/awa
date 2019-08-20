const express = require("express");
const router = express.Router();
const Project = require('../models/projectModel');
const Contact = require('../models/contactModel');

//GET
router.get('/', (req,res) => {
    Project.find((err, projects) => {
        res.render('index.ejs', {projects: projects});
    })
});

//POST
router.post('/index/creer-post', (req,res) => {
    const contact = new Contact(req.body);
    console.log(req.body)
    console.log(contact)
    contact.save (err => {
        if(err) {
            res.send(err);     
        }
        res.redirect('/');
    })
});

module.exports = router;