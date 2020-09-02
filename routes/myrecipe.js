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
    res.render('myrecipe',{recipe})
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})



router.post('/', isLoggedIn, (req, res) => {
    let formData = req.body;

    db.my_recipe.findOrCreate({
        where: { userId: req.user.dataValues.id, 
                name:formData.name},
        defaults: { name: formData.name,
                    ingredient: formData.ingr,
                    recipeUrl: formData.recipeUrl,
                    cal:formData.cal}
    }).then(([newRecipe, created]) =>{
        res.redirect('myrecipe');
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})



router.get('/:id',isLoggedIn,(req, res) => {

    db.my_recipe.findAll({
        where: { userId: req.user.dataValues.id},
    })
    .then((recipe) => {
    res.render('myrecipe',{recipe})
    })
    .catch(err => {
        console.log(err)
        res.render('error')
    })
})



router.delete('/:id',isLoggedIn, (req,res) => {
    console.log('This is the request id', req.params.id)
    db.my_recipe.destroy({
        where: {id:req.params.id}
    })
    .then(() => {
        res.redirect('myrecipe');
    })
    .catch((err) => {
        console.log('ERROR',err)
        res.render('error')
    })
})





module.exports = router;