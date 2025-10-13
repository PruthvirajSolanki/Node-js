const mongoose = require("mongoose");

const dbconnection = () => {
    mongoose.connect("mongodb+srv://fenamavani:fena1403@cluster0.v2tedkq.mongodb.net/pr-5-movies")
        .then(() => console.log("DB is connected..."))
        .catch(err => console.error("DB Connection Error:", err));
};

module.exports = dbconnection();