const express = require('express');
const router = express.Router();
const axios = require('axios');

const db = require('../models');
const { response } = require('express');



//for recipe
let RECIPE_API_ID = process.env.EDAMAN_RECIPE_API_ID
let RECIPE_API_KEY = process.env.EDAMAN_RECIPE_API_KEY

const recipeUrl = `https://api.edamam.com/search?`

router.get('/', (req, res) => {
    let food = req.query.q
    let calorie = req.query.calories
    let diets = req.query.diet
    let healths = req.query.health
    let qs = {
        params: {
            q: food,
            app_id: RECIPE_API_ID,
            app_key: RECIPE_API_KEY,
            from: 0,
            to: 12,
        }
    }
    if (calorie) {
        qs.params.calories = calorie
    }
    if (diets) {
        qs.params.diet = diets
    }
    if (healths) {
        qs.params.health = healths
    }
    if (calorie && diets){
        qs.params.calories = calorie
        qs.params.diet = diets
    }
    if(calorie && healths){
        qs.params.calories = calorie
        qs.params.health = healths
    }
    if(diets && healths){
        qs.params.diet = diets
        qs.params.health = healths
    }
    if(calorie && diets && healths){
        qs.params.calories = calorie
        qs.params.diet = diets
        qs.params.health = healths
    }
    axios.get(recipeUrl, qs)
        .then(response => {
            let data = response.data.hits
            // console.log('Look at me!!!!!!!!!!!!', data[0].recipe.url)
            res.render('results', { data })
        }).catch(err => {
            res.render('error')
            console.log(err)
        })
})


module.exports = router;