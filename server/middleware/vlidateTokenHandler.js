const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  try {
    
    let token;
    let authHeader = await req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {

      token = await authHeader.split(" ")[1];

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "user is not authenticated" });
        } else {
          req.user = decoded.user;
          next();
        }
      });

      if (!token) {
        res
          .status(401)
          .json({ message: "user is not authorized or the token is missing " });
      } 


    } else {


    }

  } catch (error) {
    console.error(error);
  }
});

module.exports = validateToken;
