const router = require("express").Router();
const User = require("../models/Player");

const bcrypt = require("bcrypt");
//GET ALL USERS
router.get("/rank", async (req, res) => {

    try {
        const users = await User.find().sort({points:-1});

        res.status(200).json(users);

    }
    catch (err) {
        console.log("error chlaa jaa")
        res.status(500).json(err);
    }


})





//UPDATE
router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(401).json("You can update only your account!");
    }
});

//DELETE
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);

        } catch (err) {
            res.status(404).json("User not found!");
        }
    } else {
        res.status(401).json("You can delete only your account!");
    }
});

//GET USER
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;