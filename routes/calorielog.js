const express = require('express');
const router = express.Router();
const axios = require('axios');
// const Sequelize = require('sequelize')

const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

const { response } = require('express');
// const { NOW } = require('sequelize');
const { sequelize } = require('../models');


//for recipe
let FOOD_API_ID = process.env.EDAMAM_FOOD_DATABASE_API_ID
let FOOD_API_KEY = process.env.EDAMAM_FOOD_DATABASE_API_KEY

const foodUrl = 'https://api.edamam.com/api/food-database/v2/parser?';
const TODAY = new Date().toDateString().split("T").toString().slice(3)



router.get('/',isLoggedIn,async (req, res) => {
// console.log(new Date())
// console.log(TODAY)
// console.log(new Date())
    await db.calorieLog.findAll({
        where: { userId: req.user.dataValues.id,
                Date: TODAY                    
                }
    })
    .then((element) => {
    res.render('calorielog',{element})
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/', isLoggedIn, (req, res) => {
    let formData = req.body;
 
    db.calorieLog.create({
        userId:req.user.dataValues.id,
        food: formData.name,
        calories:formData.cal,
        Date: TODAY
        // Date: new Date().toDateString()
        
    }).then((data) =>{
        res.redirect('calorielog');
    })
    .catch(err => {
        console.log(err)
    })
})



router.get('/calsearch', isLoggedIn, (req, res) => {
  
    let qs = {
        params: {
            ingr: req.query.ingr,
            app_id: FOOD_API_ID,
            app_key: FOOD_API_KEY,
        }
    }    
    axios.get(foodUrl,qs)
    .then(response => {
        console.log(response.data.hints[0])
        let data = response.data.hints
        res.render('calsearch',{data})
    }).catch(err => {
        console.log(err)
    })
})








router.get('/:id',isLoggedIn,(req, res) => {

    db.calorieLog.findAll({
        where: { userId: req.user.dataValues.id,
                Date: TODAY  },
    })
    .then((element) => {
    res.render('calorielog',{element})
    })
    .catch(err => {
        console.log(err)
    })
})



router.delete('/:id',isLoggedIn, (req,res) => {
    console.log('This is the request id', req.params.id)
    db.calorieLog.destroy({
        where: {id:req.params.id}
    })
    .then(() => {
        res.redirect('calorielog');
    })
    .catch((err) => {
        console.log('ERROR',err)
    })
})



router.get('/:id/edit',isLoggedIn,(req, res) => {

    db.calorieLog.findAll({
        where: {id:req.params.id}
    })
    .then((element) => {
    res.render('edit',{element})
    })
    .catch(err => {
        console.log(err)
    })
})



router.put('/:id/edit',isLoggedIn,(req, res) => {
    let formData = req.body;
    db.calorieLog.update({
        food:formData.food,
            calories:formData.calories
    },{
        where: {id: req.params.id}
    })
    .then(() => {
    res.redirect('complete')
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/:id/complete',isLoggedIn,(req, res) => {

    db.calorieLog.findAll({
        where: { userId: req.user.dataValues.id,
                Date: TODAY
                    
                }
    })
    .then((element) => {
    res.render('calorielog',{element})
    })
    .catch(err => {
        console.log(err)
    })
})




module.exports = router;