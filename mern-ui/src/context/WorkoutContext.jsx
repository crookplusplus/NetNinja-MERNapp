import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

//state is the state of the page
//action is the object that is passed to the dispatch function
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS' :
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                // '...' means to spread
                //state has an array of all the workouts & action.payload is the one being added
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    //dispatch is a function that uses an object with a 'type' and 'payload'
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })



    return(
        <WorkoutContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutContext.Provider>
    )
}