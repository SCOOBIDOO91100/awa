const express = require("express");
const multer  = require('multer');
const router = express.Router();
const Database = require('../models/database');
const Project = require('../models/projectModel');
const Contact = require('../models/contactModel');
const { ensureAuthenticated } = require('../config/auth');

const db = new Database();


// Importation de Nodemailer:
const mailer = require('nodemailer');

let smtpTransport = require('nodemailer-smtp-transport');

// Création du chemin vers ma page contact:

router.post('/', (req, res) => {
    
    const output = `<p>You have a new contact request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>email: ${req.body.email}</li>
    <li>name: ${req.body.name}</li>
  </ul>
  <h3> Messages: </h3>
  <p>${req.body.message}</p>`;

  let transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nabil.hafidalaoui@gmail.com', // generated ethereal user
        pass: "vanpersie91" // protection du pwd
    }
  });
  const mailOptions = {
    from: '"NodeMailer Contact" <simplonportfolio@gmail.com>', // sender address
    to: 'nabil.hafidalaoui@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  // send mail with defined transport object
  // Envois du mail
  res.redirect('/');

});


//configuration de mutler
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
  })
var upload = multer({ storage: storage })





//Afficher la page admin.ejs à l'url /admin
router.get('/admin', ensureAuthenticated, (req,res) => {
    res.render('admin.ejs');
});



//Afficher la page admin_contacts à l'url /admin/contacts
router.get('/admin/contacts', ensureAuthenticated, (req,res) => {
    Contact.find((err, contacts) => {
        res.render('admin_contacts', {contacts: contacts});
    }) 
});


//Afficher la page admin_projects.ejs à l'url /display-post
router.get('/admin/display-post', ensureAuthenticated, (req, res) => {
    Project.find((err, projects) => {
        res.render('admin_projects', {projects: projects});
    })
});


//Afficher la page /admin/display-post ou se fera la suppression d'un projet
router.get('/admin/delete', ensureAuthenticated,(req, res) => {
    Project.findById({ _id: req.body.id}).then((response) => {
       res.redirect('/admin/display-post')
    })
});


//Afficher la page admin_edit à /admin/edit/ par son id
router.get('/admin/edit/:_id', ensureAuthenticated, (req, res) => {
    const id = req.params._id;
    Project.findById(id, (err, project) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.render('admin_edit', {project : project});
    })
});


//-----------------------------------------------------------


//Supprimer les projets de /display-post
router.post('/admin/delete', ensureAuthenticated, (req, res) => {
    Project.deleteOne({ _id: req.body.id}).then((response) => {
       res.redirect('/admin/display-post')
    })
});



//Creer un projet et le rediriger vers l'url / quand on a submit
router.post('/admin/create-project', upload.single('image'),ensureAuthenticated,(req,res) => {
    const project = new Project(req.body);
    project.image = req.file.filename;
    project.save (err => {
        if(err) {
            res.send(err);
        }
        res.redirect('/');
    })
});


//Rediriger vers l'url /admin/edit quand on a submit un projet par son id à l'url /admin/edit 
 router.post('/admin/edit', upload.single('image'), ensureAuthenticated, (req, res) => {
     console.log(req.body)
     Project.findByIdAndUpdate(req.body.id, {$set:req.body}, (err, result) => {
         console.log(result)
         res.redirect('/admin/edit/' + req.body.id)
     })
 });


module.exports = router;