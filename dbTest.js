const db = require('./models')

db.user.findOne()
.then(foundUser=>{
    foundUser.createCalorieLog({
    food: 'Hamburger',
    calories: 100
})
.then(createdCalorieLog=>{
    console.log(createdCalorieLog.get())
})
})

