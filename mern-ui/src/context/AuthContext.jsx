import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

//carries out the state assignment for the context switch
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

//component like function
export const AuthContextProvider = ({ children }) => {
    //dispatch is a reference to the useReducer which references authReducer
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  //this checks for a user in storage for upon a refresh
  useEffect(() => {
    //when an item is stored in local storage it stored as a json string
    //here we want to store it as an object
    //if the object is not present it will return null
    const user = JSON.parse(localStorage.getItem('user'))


    if (user) {
      dispatch({type: 'LOGIN', payload: user})
    }

  }, [])

  console.log('AuthContext state: ', state)

  return (
    //the value obj allows for the state var and dispatch to be used else where in the app code
    <AuthContext.Provider value={{...state, dispatch}}>
        { children }
    </AuthContext.Provider>
  )
};
