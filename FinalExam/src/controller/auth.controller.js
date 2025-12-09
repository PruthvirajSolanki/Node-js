const User = require("../models/usermodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.json({ status: 400, message: "User is Already Exist" })
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10)

        let imagePath = ""
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`
        }

        user = await User.create({
            ...req.body,
            password: hashPassword,
            profileImage: imagePath,
        })

        return res.json({ status: 200, user, message: "User is Added Succesful" })

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
}

exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (!user) {
            return res.json({ status: 404, message: 'User not found' });
        }

        let Password = await bcrypt.compare(req.body.password, user.password);
        if (!Password) {
            return res.json({ message: "Invalid Credential" });
        }

        let token = jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY);

        return res.json({ status: 200, message: 'Loging Success', token, user });

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
};

exports.profile = async (req, res) => {
    try {
        console.log("user profile run");
        return res.json({ status: 200, message: 'Fetch Profile', data: req.user });
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
};