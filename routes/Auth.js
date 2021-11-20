const router = require("express").Router();
const Player = require("../models/Player");
const bcrypt = require("bcrypt");
 
//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newPlayer = new Player({
      username: req.body.username,
      email: req.body.email,
      phoneno:req.body.phoneno,
      password: hashedPass,
    });

    const player = await newPlayer.save();
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const player = await Player.findOne({ username: req.body.username });
    !player && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, player.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = await player._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;