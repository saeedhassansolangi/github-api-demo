const express = require("express");
const bodyparser = require("body-parser");
const fetch = require("node-fetch");
const morgan = require("morgan");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT
const API = process.env.API



app.use(morgan("dev"))
app.use(bodyparser.urlencoded({
    extended: true
}))
app.set("view engine", "ejs");
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("home")
})


app.get("/user/error", (req, res) => {
    res.render("error")
})


app.post("/user", (req, res) => {
    let query = req.body.search;
    // console.log(typeof query);
    if (query !== "") {
        // console.log(`${API}${query}`);
        fetch(`${API}${query}`, {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.github.v3+json"
                },
            })
            .then(response => response.json())
            .then(userData => {
                // console.log(userData);

                if (query === userData.login) {
                    // https://api.github.com/users/saeedhassansolangi/repos
                    fetch(`${API}${ query }/repos`)
                        .then(response => response.json())
                        .then(userRepos => {
                            res.render("user", {
                                userData,
                                userRepos
                            })
                        })
                        .catch(err => console.log(err))

                } else {
                    console.log(userData);
                    res.render("error", {
                        userData
                    })

                }

            }).catch(err => console.log(err))
    } else {
        res.redirect("back")
    }

})




app.listen(PORT, _ => console.log(`Server is Running on the PORT ${PORT}`))