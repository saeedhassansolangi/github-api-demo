const express = require("express");
const bodyparser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT
const API = process.env.API

// const URL = "https://api.github.com/users/saeedhassansolangi";
// const URL = "https://api.github.com/users/";
// let query = "saeedhassansolangi"

// let user = API + query

// fetch(user)
//     .then(response => response.json())
//     .then(body => {
//         console.log(body);
        
//     }).catch(err=>console.log(err))
app.use(bodyparser.urlencoded({extended:true}))
app.set("view engine", "ejs");
app.use(express.static("public"))

app.get("/", (req, res) => {
    // res.send("Welcome to the GITHUB API")
    res.render("home")
})



app.post("/user", (req, res) => {
    let query = req.body.search;
    console.log(typeof query);
    if (query !== "") {
        console.log(`${API}${query}`);
        fetch(`${API}${query}`)
            .then(response => response.json())
            .then(userData => {
            res.render("user",{userData})
        })
        
        // res.send("hellow")
    } else {
        res.send("Plz give correct username")
    }
    
})




app.listen(PORT,_=>console.log(`Server is Running on the PORT ${PORT}`))