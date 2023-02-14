const express = require('express')
const app = express();
require('dotenv').config()
const cors = require('cors')
const fs = require("node:fs");
const { json } = require('express');

const getRaces = () =>{
    const races = fs.readFileSync("./data/circuit_data.json")
    return JSON.parse(races)
}

const getFollowing = () =>{
    const following = fs.readFileSync("./data/following_data.json")
    
    return JSON.parse(following)
}

app.use(cors());
app.use(express.json())
app.use(express.static("public"))

const PORT = process.env.PORT;

app.get('/', (req,res) => {
    const races = getRaces();
    res.json(races)
})

app.get('/following', (req,res) => {
    const following = getFollowing();
    res.json(following)
})

app.get('/:names',(req,res) => {
    const races = getRaces();
    const selected = races.find(item => item.Circuit.Location.Locality === req.params.names)
    res.json(selected)
})

app.get("/following/:names",(req,res) => {
    const following = getFollowing();
    const selected = following.find(item => item.Circuit.Location.Locality === req.params.names);
    res.json(selected);
})

app.put("/following/:names", (req,res) =>{
    const following = getFollowing()
    let newFollowing = following.filter(element => {
        return element.Circuit.Location.Locality !== req.params.names
    });
    fs.writeFileSync('./data/following_data.json',JSON.stringify(newFollowing))
    res.json("Race has been deleted")
})

app.post('/following' ,(req,res) =>{
    const following = getFollowing();
    following.push(req.body)
    fs.writeFileSync('./data/following_data.json',JSON.stringify(following))
    res.json("race has been posted")
})





app.listen(PORT, () =>{
    console.log(`Server is up and running on Port ${PORT} we are in develop!`)
})