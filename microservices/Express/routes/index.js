const express = require('express');
const {PersonSchema} = require("../db");
const models = require("../db");
const addPerson = require('../add')
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello World')
});

router.get('/person',async (req,res,next)=> {
    const persons = await models.PersonSchema.findAll();
    res.json(persons);
})

router.get('/person/:id', async(req, res, next) => {
  const { id } = req.params;
  const person = await models.PersonSchema.findByPk(id);
  res.json(person);
})

router.post('/create', async (req,res,next)=> {
    try {
        await addPerson;
    } catch(error){

    }
})


module.exports = router;
