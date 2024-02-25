// server.js
const express = require("express");
const app = express();
app.use(express.json()); // this will enable us to use 'json' formatted data

const dotenv = require("dotenv").config({ path: "./config.env" }); // just use it one time in index.js and no need to initialize it again and again

const port = process.env.PORT || 5000;


const connectDb= require("./config/DBconnection"); //mongoose connection
connectDb();

var errorHandler = require("./middleware/errorHandler")

app.use("/api/contacts", require("./routes/ContactRoutes")); // all routing methods are here
app.use(errorHandler);


// demo
app.get("/", (req, res) => {
  res.send(`Hello World! on port ${port} `);
   
});
// demo2
app.post("/api/:id", async (req,res)=> {
  const { key, apiName } = await req.body;
  res.json({
    message: `u got api ${apiName} and key ${key} and id is ${req.params.id}`
  })
})
// demo3
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

// listen method
app.listen(port, () => {
  console.log(`server started on port ${port} `);
});