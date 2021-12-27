require('dotenv').config()
const express = require("express");
const cors = require("cors");

const app = express();

const helper = require('./app/utils/helper')

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route with middleware
app.use(function (req, res, next) {
    const { authorization } = req.headers;
    if (authorization == process.env.TOKEN)
        next()
    else
        res.json({ status: 500, message: "Unauthorized" });

})

app.get("/", (req, res) => {
    res.json({ message: "Welcome to sandesh gragdan application." });
});

require("./app/routes/tag.routes.js")(app);
require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
