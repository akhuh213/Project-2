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
    let food = req.query.q
    let calorie = req.query.calories
    let qs ={
        params: {
            q:food,
            app_id:RECIPE_API_ID,
            app_key:RECIPE_API_KEY,
            from:0,
            to:9         
        }
    }
    let cal ={
        params: {
            calories:calorie            
        }
    }

    if(calorie){
    axios.get(recipeUrl,qs,cal)
    .then(response =>{
        
        let data = response.data.hits
        // console.log('Look at me!!!!!!!!!!!!',data[0].ingredient)
        res.render('results', {data})
    }).catch(err => {
        console.log(err)
    })
    }else{
        axios.get(recipeUrl,qs)
        .then(response =>{
            
            let data = response.data.hits
            // console.log('Look at me!!!!!!!!!!!!',data[0].ingredient)
            res.render('results', {data})
        }).catch(err => {
            console.log(err)
    })
   
}
})



module.exports = router;