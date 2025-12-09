const express = require("express");
const { registerUser, loginUser, profile } = require("../controller/auth.controller");
const { verifytoken, Roleverify } = require("../middleware/verifytoken.middleware");

const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.post("/profile", verifytoken, Roleverify("Admin","User"), profile);

module.exports = routes;