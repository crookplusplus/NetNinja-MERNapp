const express = require('express')
const { 
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//This protects the following routes from access from unauthenticated users
//require auth for all workout routes
router.use(requireAuth)

//get ALL workouts
router.get('/', getWorkouts)

//get a single workout
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

router.patch('/:id', updateWorkout)


//used for export of module
module.exports = router