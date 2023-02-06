const express = require('express')
const app = express();

const cors = require('cors')

app.use(cors());

const PORT = process.env.PORT || 5050;

app.get('/', (req,res) => {
    res.send("hello this is the initial test ")
})

app.listen(PORT, () =>{
    console.log(`Server is up and running on Port ${PORT}`)
})