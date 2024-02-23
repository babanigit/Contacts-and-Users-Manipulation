const express = require("express");
const app = express();

const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

app.use("/api/contacts", require("./routes/ContactRoutes"));


app.get("/", (req, res) => {
  res.send(`Hello World! on port ${port} `);
});

app.listen(port, () => {
  console.log(`server started on port ${port} `);
});
