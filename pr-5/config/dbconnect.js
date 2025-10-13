const mongoose = require('mongoose');

const dbConnnection = () => {
    mongoose.connect("mongodb+srv://pruthvirajsolanki125_db_user:Pruthvi2005@cluster0.br0oqmd.mongodb.net/Bookmyshow")
        .then(() => console.log("DB is Connected"))
        .catch(err => console.log(err));
}

module.exports = dbConnnection;