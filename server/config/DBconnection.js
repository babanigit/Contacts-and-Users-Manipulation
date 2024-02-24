const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const DB = process.env.CONNECTION_STRING;
    const connect = await mongoose.connect(DB);

    console.log(
      "database connected: ",
      connect.connection.host,
      connect.connection.name
    );

  } catch (error) {
    console.log("data did'nt connect ")
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;
