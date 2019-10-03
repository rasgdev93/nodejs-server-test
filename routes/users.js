var express = require('express');
var router = express.Router();
const Joi = require('@hapi/joi');
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'
const base = 'BlackPanter'
const  JOI_HOLA = Joi.object({
  Nombre: Joi.string().min(1).max(10).required(),
  Apellido: Joi.string().min(1).max(10).required()
})
//Token
//Origin -> cors
//Refresh Token
//Joi
//acceso
var MW_ = function (req, res, next) {
  if(JOI_HOLA.validate(req.body).error === undefined){
    next();
  }else{
    res.status(400).send({error:"formato req invalido"})
  }
};

var Auth = function (req, res, next) {
  if(JOI_HOLA.validate(req.body).error === undefined){
    next();
  }else{
    res.status(400).send({error:"formato req invalido"})
  }
};



router.get('/hola',[Auth,MW_], function(req, res, next) {
  res.status(200).send({mensaje:"Hola "+req.body.Nombre})
});


router.get('/', function(req, res, next) {
  MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if(err) throw res.status(400).send("error bd")
    let ADP =  db.db(base).collection("ADP");

    ADP.find({}).project({Nombre:1,Apellido:1}).toArray((err,data)=>{
      res.status(200).send(data)  
    });
  });
});


router.post('/Insert',MW_, function(req, res, next) {
  MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if(err) throw res.status(400).send("error bd")
    let ADP =  db.db(base).collection("ADP");

    ADP.insertOne(req.body,(err,data)=>{
      res.status(200).send(data)  
    });
  });
});



router.post('/InsertMany', function(req, res, next) {
  MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if(err) throw res.status(400).send("error bd")
    let ADP =  db.db(base).collection("ADP");

    ADP.insert(req.body,(err,data)=>{
      res.status(200).send(data)  
    });
  });
});



router.post('/Delete', function(req, res, next) {
  MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if(err) throw res.status(400).send("error bd")
    let ADP =  db.db(base).collection("ADP");

    ADP.deleteOne({_id:ObjectID(req.body._id)},(err,data)=>{
      res.status(200).send(data)  
    });
  });
});



module.exports = router;
