const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://pruthvirajsolanki125_db_user:Pruthvi2005@cluster0.br0oqmd.mongodb.net/Adminpanel");
    // await mongoose.connect("");
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database Connection Failed:", err);
  }
};

module.exports = dbConnect;
 