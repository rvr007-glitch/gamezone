const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express()
mongoose.connect(process.env.Mongo_Url)
    .then(() => console.log("db connected")).catch((err) => { console.log(err) });

const authRoute = require("./routes/Auth");
const userRoute = require("./routes/User");
app.use(express.json());
const multer = require("multer");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const path = require('path')

const PORT = process.env.Port || 5000;


const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use("/images", express.static(path.join(__dirname, "/images")));
io.on('connection', socket => {
    socket.on('join', (payload, callback) => {
        let numberOfUsersInRoom = getUsersInRoom(payload.room).length

        const { error, newUser } = addUser({
            id: socket.id,
            name: numberOfUsersInRoom === 0 ? 'Player 1' : 'Player 2',
            room: payload.room
        })

        if (error)
            return callback(error)

        socket.join(newUser.room)

        io.to(newUser.room).emit('roomData', { room: newUser.room, users: getUsersInRoom(newUser.room) })
        socket.emit('currentUserData', { name: newUser.name })
        callback()
    })

    socket.on('initGameState', gameState => {
        const user = getUser(socket.id)
        if (user)
            io.to(user.room).emit('initGameState', gameState)
    })

    socket.on('updateGameState', gameState => {
        const user = getUser(socket.id)
        if (user)
            io.to(user.room).emit('updateGameState', gameState)
    })

    socket.on('sendMessage', (payload, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', { user: user.name, text: payload.message })
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user)
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
    })
})

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build/'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});







app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})