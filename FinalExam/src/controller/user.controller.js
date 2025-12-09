const User = require("../models/usermodels");

exports.Edituser = async (req, res) => {
    try {

        const userId = req.params.id;
        const singleUser = await User.findById(userId);
        if (!singleUser) {
            return res.json({ status: 404, message: "user not found" });
        }

        if (req.user.role === "User" && singleUser.role === "User" && req.user.id != singleUser.id) {
            return res.json({ status: 403, message: "user cannot edit another user" });
        }

        await User.findByIdAndUpdate(
            userId,
            { ...req.body },
            { new: true }
        );

        return res.json({ status: 200, message: "user updated successfully" });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};

exports.Deleteuser = async (req, res) => {
    try {

        const userId = req.params.id;
        const singleUser = await User.findById(userId);
        if (!singleUser) {
            return res.json({ status: 404, message: "User not found" });
        }

        if (req.user.role === "User" && req.user.id !== singleUser.id) {
            return res.json({ status: 403, message: "User cannot delete another user" });
        }

        await User.findByIdAndUpdate(userId, { isDelete: true });

        return res.json({ status: 200, message: "User soft deleted successfully!" });

    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "Something went wrong" });
    }
};