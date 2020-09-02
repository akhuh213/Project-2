# Calorie Tracker

## Introduction
This app is designed for users who are on a diet. User can search the recipes in certain calories ranges, and save them in 'My recipe' page. Also, user can log the the food and calories that they take for the day on 'caloire log'page. 
This app uses two API database from Edamam.com. 

[website](https://track-your-calories.herokuapp.com/)</br>
[ERD](https://app.diagrams.net/?libs=general;er#Hakhuh213%2FHow-to-make-node%2Fmaster%2FUntitled%20Diagram.drawio)</br>
[WireFrames](https://app.diagrams.net/#Hakhuh213%2FProject2Ideas%2Fmaster%2FUntitled%20Diagram.drawio)</br>


## Technologies
- Node.js
- Express
- Sequelize
- EJS
- Postgresql

## Database (postgresql)

### Models
Three models were created using sequelize, which are user, calorielog, and my_recipe.  
User model: User name, authentication information
Calorielog: Food and calories information that user logs
my_recipe: Recipe information that user saves. 
More information about models and association are in ERD 
[ERD](https://app.diagrams.net/?libs=general;er#Hakhuh213%2FHow-to-make-node%2Fmaster%2FUntitled%20Diagram.drawio)

## Installation
Autho portion was built during the class.
- npm install dependencies 
- Create a database
- Create models and link to the database
- Create Routes and ejs files in views
- Style pages in CSS

## Coding 
### Search Engines with several options 

``` javascript
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
            console.log(err)
        })
})
```


### Pulling user's data that is made today

``` javascript
const TODAY = new Date().toDateString().split("T").toString().slice(3)

router.get('/',isLoggedIn,async (req, res) => {

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
```

### Getting sum of calories and display

``` javascript
<%let arrayy =[]%>
<% arrayy.push(e.calories)%> 
<%let sum = arrayy.reduce(function(a,b){%>
  <% return a+b;%>
  <%},0);%>
  Your total calories = <%=sum  %> 
  ```

### Setting Put route
When user clicks edit button on calorie log, it goes to put route where user can update their data. 

```javascript

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
                Date: TODAY}
    })
    .then((element) => {
    res.render('calorielog',{element})
    })
    .catch(err => {
        console.log(err)
    })
})
```












