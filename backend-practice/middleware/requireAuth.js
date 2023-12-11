const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify authentication
  //one of the headers is an authorization property
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  //the authorization header comes as a string with the word "Bearer or Basic"
  //out in front. This needs to be split from the token to use the token.
  //the split() splits string into an array and we need position one of the array for the token
  const token = authorization.split(" ")[1];

  try {
    //the id is returned if the user's token is validated
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth