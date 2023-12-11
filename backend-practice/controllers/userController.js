const User = require("../models/userModel");
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    //args: 1st: acts as payload (no sensitive info)
    //2nd: env secret string
    //3rd: (options) '3d'=> 3 days expiration
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'} )
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password);
    
        //create a token
        const token = createToken(user._id)
    
        //pass the token back to the browser
        res.status(200).json({ email, token });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //create a token
    const token = createToken(user._id)

    //pass the token back to the browser
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//export
module.exports = {
  loginUser,
  signupUser,
};
