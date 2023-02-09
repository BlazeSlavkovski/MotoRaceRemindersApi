const express = require('express')
const app = express();
require('dotenv').config()
const cors = require('cors')
const fs = require("node:fs")

const getRaces = () =>{
    const races = fs.readFileSync("./data/circuit_data.json")
    return JSON.parse(races)
}

app.use(cors());
app.use(express.json())
app.use(express.static("public"))

const PORT = process.env.PORT;

app.get('/', (req,res) => {
    const races = getRaces();
    res.json(races)
})




app.listen(PORT, () =>{
    console.log(`Server is up and running on Port ${PORT} we are in develop!`)
})