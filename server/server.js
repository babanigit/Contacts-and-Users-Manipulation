const dotenv = require("dotenv").config({ path: "./config.env" }); // just use it one time in index.js and no need to initialize it again and again

const express = require("express");
const app = express();

const connectDb= require("./config/DBconnection");
connectDb();

app.use(express.json()); // this will enable us to use 'json' formatted data

const port = process.env.PORT || 5000;

// all routing methods are here
// into ContactRoutes
app.use("/api/contacts", require("./routes/ContactRoutes"));


app.get("/", (req, res) => {
  res.send(`Hello World! on port ${port} `);
   
});

// get request from postman and return response to postman 
app.post("/trail",   async(req,res)=> {

  try {
    const { name , email } = await req.body;
    res.json({message:`response from trail route ${name} and ${email} `})
    // res.send(`${name} and ${email}  `)
    console.log("request came from /trail from postman")
    // console.log(req.body)
    
  } catch (error) {
    console.error(error)
  }
 
} );


// app.use(express.json());
// app.post("/trail",async (req,res)=> {
//   const {name , email} = await req.body;
//   res.json({message:`response from trail route ${name} and ${email} `})
// })

app.listen(port, () => {
  console.log(`server started on port ${port} `);
});