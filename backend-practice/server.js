require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

//express app
const app = express()

//middleware
app.use(express.json())     //saves the information that is transmitted with the request into req.body for later use
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
//the /api/ directs the server to the routes folder and pulls the file after the /api/ 
// chooses the route based on the context of the call
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to the db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to the db & listening on port,', process.env.PORT)
        })})
    .catch((error) => {
        console.log(error)
    })

