require('dotenv').config();

const express = require('express')
const cors = require('cors')

const server = express()

const port = process.env.PORT

server.use(cors());

server.get("/", (req, res) => {
    res.send({ message: "We did it!" });
})

server.listen(port, () => {console.log("Server started on port", port) })