const asyncHandler = require("express-async-handler");
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// this is our logic connect to the database
// GET,POST,UPDATE,DELETE,and GET by the id  //total 5 logics

// @desc register a user
// @routes POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = await req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "all filed required" });
      // res.status(400);
      // throw new Error({ message: "all field are mandatory" });
    } else {
      const userAvailable = await User.findOne({ email });
      if (userAvailable) {
        res
          .status(400)
          .json({ message: `user ${email} is already registered  ` });
      } else {


        // create hashedPassword
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashPassword is : " + hashedPassword);

        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        console.log(`user created ${user} `);

        if (user) {
          res.status(201).json({ _id: user.id, email: user.email });
        } else {
          res.status(400).json({ message: "user data invalid" });
        }

        res.status(201).json({ message: " created" });

        
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// @desc register a user
// @routes POST /api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  try {

    const { email, password } = await req.body;
    if (!email || !password) {
      res.status(400).json({ message: "all field required" });
    } else {

      const user = await User.findOne({ email });

      // compare with the both hashed password
      if (user && (await bcrypt.compare(password, user.password))) {

        // generate Token
        const accessToken = jwt.sign(
          {
            user: {
              username: user.username,
              email: user.email,
              id: user.id,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        res.status(200).json({ accessToken });

      } else {
        res.status(401).json({ message: "email or password is invalid" });
      }
      
    }


  } catch (error) {
    console.error(error);
  }
});

// @desc register a user
// @routes GET /api/user/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({
    message:"contact user",
    user: req.user
  });
});

module.exports = { registerUser, loginUser, currentUser };
