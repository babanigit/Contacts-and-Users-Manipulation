const asyncHandler = require("express-async-handler");
const User = require("../model/UserModel");

// this is our logic connect to the database
// GET,POST,UPDATE,DELETE,and GET by the id  //total 5 logics

// @desc register a user
// @routes POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req,res)=>{
    try {
        const { username, email, password } = await req.body;
        if (!username || !email || !password) {
          res.status(400).json({ message: "all filed required" });
          // res.status(400);
          // throw new Error({ message: "all field are mandatory" });
        } else {
          const user = await User.create({
            username,
            email,
            password,
          });
          res.status(201).json(user);
        }
      } catch (error) {
        console.error(error);
      }
    });

// @desc register a user
// @routes POST /api/user/login
// @access public
const loginUser = asyncHandler(async (req,res)=>{
    res.json({message:"login the user"})
});

// @desc register a user
// @routes GET /api/user/current
// @access private
const currentUser = asyncHandler(async(req,res)=>{
    res.json({message:"current user"})
});


module.exports = {registerUser,loginUser,currentUser }