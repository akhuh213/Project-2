const express = require('express');
const router = express.Router();
const axios =require('axios');

const db = require('../models');
const { response } = require('express');


//for recipe
let RECIPE_API_ID = process.env.EDAMAN_RECIPE_API_ID
let RECIPE_API_KEY = process.env.EDAMAN_RECIPE_API_KEY

const recipeUrl = `https://api.edamam.com/search?`


router.get('/', (req, res) => {
    db.my_recipe.findAll()
    .then(response => {

        res.render('myrecipe', { data: response})
    })
})

router.post('/', function(req, res) {
    let formData = req.body;
    db.my_recipe.findOrCreate({
        where: {name:formData.name},
        defaults: {ingredient:formData.ingr}
    })
    .then(( [newRecipe, created]) =>{
        console.log(`This created: ${created}`)
        res.redirect('myrecipe') ;
        //ejs
    }).catch(err => {
        console.log(err)
    })
})




module.exports = router;