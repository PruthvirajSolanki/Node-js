const mongoose =   require("mongoose")

const DB_connection = async (req, res) => {
    await mongoose.connect("mongodb+srv://pruthvirajsolanki125_db_user:Pruthvi2005@cluster0.br0oqmd.mongodb.net/Adminpanel")
    .then("connection successfully ")
    .catch((err) =>  console.log(err))
}

module.exports = DB_connection;
