const express = require('express');
const router = express.Router();
const axios = require('axios');

const db = require('../models');
const isLoggedIn = require('../middleware/isLoggedIn');

const { response } = require('express');


//for recipe
let RECIPE_API_ID = process.env.EDAMAN_RECIPE_API_ID
let RECIPE_API_KEY = process.env.EDAMAN_RECIPE_API_KEY

const recipeUrl = `https://api.edamam.com/search?`


router.get('/',isLoggedIn,(req, res) => {

    db.my_recipe.findAll({
        where: { userId: req.user.dataValues.id},
    })
    .then((recipe) => {
        // user.my_recipes.forEach(recipe => {
        // console.log('loookkkk 25555555',recipe)
        res.render('myrecipe',{recipe})
        // console.log('11111111',user.my_recipes)

        // })
    }).catch(err => {
        console.log(err)
    })
})




router.post('/', isLoggedIn, (req, res) => {
    let formData = req.body;

    db.my_recipe.findOrCreate({
        where: { userId: req.user.dataValues.id, 
                name:formData.name},
        defaults: { name: formData.name,
                    ingredient: formData.ingr,
                    recipeUrl: formData.url,
                    cal:formData.cal}
    }).then(([newRecipe, created]) =>{
        res.redirect('myrecipe');
    })
    .catch(err => {
        console.log(err)
    })
})





module.exports = router;