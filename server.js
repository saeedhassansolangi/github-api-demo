const express = require("express");
const bodyparser = require("body-parser");
const fetch = require("node-fetch");
const morgan = require("morgan");
const moment = require("moment");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const API = process.env.API;
// const TOKEN = process.env.TOKEN;

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
                var created = new Date(userData.created_at);
                var updated = new Date(userData.updated_at);
                
                // const date = created.getUTCDate();
                // const year = created.getUTCFullYear();
                // const month = created.getUTCMonth();
                // const time = created.toTimeString().substring(0, 8);
                const dateString = created.toDateString()
                // console.log(dateString);
                
                
                
                // const created_at = {
                //     date,
                //     year,
                //     month,
                //     dateString
                // }

                const created_at = {
                                    dateString
                                }


                // const udate =  updated.getUTCDate();
                // const uyear =  updated.getUTCFullYear();
                // const umonth = updated.getUTCMonth();
                const dateStringUp = updated.toDateString()
                console.log(dateStringUp);
                
                
                // const updated_at = {
                //     udate,
                //     uyear,
                //     umonth
                // }

                const updated_at = {
                    dateStringUp
                }

                // console.log(updated_at.toDateString());
                // console.log(created_at.toDateString());        
                // console.log(d.getUTCDate()); // Hours
                // console.log(d.getUTCFullYear());
                // console.log(d.getUTCMonth());
                if (query === userData.login) {
                    // https://api.github.com/users/saeedhassansolangi/repos
                    fetch(`${API}${ query }/repos`)
                        .then(response => response.json())
                        .then(userRepos => {
                            res.render("user", {
                                userData,
                                userRepos,
                                created_at,
                                updated_at
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