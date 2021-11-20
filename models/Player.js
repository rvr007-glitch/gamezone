const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
        phoneno: {
            type: Number,


            default: "",
            required: true,
        },
        points: {
            type: Number,


            default: 0,

        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Player", PlayerSchema);