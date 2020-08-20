const express = require('express');
const router = express.Router();
const axios = require('axios');

const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

const { response } = require('express');


//for recipe
let FOOD_API_ID = process.env.EDAMAM_FOOD_DATABASE_API_ID
let FOOD_API_KEY = process.env.EDAMAM_FOOD_DATABASE_API_KEY

const foodUrl = 'https://api.edamam.com/api/food-database/v2/parser?'


router.get('/',isLoggedIn,(req, res) => {

    db.calorieLog.findAll({
        where: { userId: req.user.dataValues.id},
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

    db.calorieLog.findOrCreate({
        where: { userId: req.user.dataValues.id, 
                food:formData.name},
        defaults: { food: formData.name,
                    calories:formData.cal,
                    totalCalories:formData.cal}
    }).then(([newCalorie, created]) =>{
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
        // console.log('Look at me!!!!!!!!!!!!', data[0].recipe.url)
        res.render('calsearch',{data})
    }).catch(err => {
        console.log(err)
    })
})


module.exports = router;