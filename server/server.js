const express = require('express')
const path = require("path");
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/user-routes');
const websiteRoutes = require('./routes/website-routes');

const app = express()
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./views");

app.set("view engine", "ejs");
app.set("views", viewsPath);

app.use(express.static(publicDirectoryPath));
const PORT = process.env.PORT || 3000

connectDB();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/website', websiteRoutes);

app.get("/", (req, res) => {
    const visitedWebsites = [
        {
            rank: 1,
            domain: "heroku",
            url: "1.com",
            times: 4,
            category: "green",
            carbon: 11.8
        },
        {
            rank: 2,
            domain: "google",
            url: "google.com",
            times: 21,
            category: "non-green",
            carbon: 41.6
        },
        {
            rank: 3,
            domain: "netflix",
            url: "bhaiya.com",
            times: 5,
            category: "green",
            carbon: 511.78
        },
        {
            rank: 4,
            domain: "facebook",
            url: "tumhare.com",
            times: 9,
            category: "non-green",
            carbon: 121.56
        },
        {
            rank: 5,
            domain: "wikipedia",
            url: "koibhi.com",
            times: 2,
            category: "semi-green",
            carbon: 1.8
        },
        {
            rank: 6,
            domain: "hastagio",
            url: "chalore.com",
            times: 1,
            category: "semi-green",
            carbon: 23.8
        },
        {
            rank: 7,
            domain: "knowledge",
            url: "cggv.com",
            times: 4,
            category: "green",
            carbon: 14.8
        },
        {
            rank: 8,
            domain: "agsagadadf",
            url: "godafogle.com",
            times: 291,
            category: "green",
            carbon: 41.6
        },
        {
            rank: 9,
            domain: "netflix",
            url: "bhaiya.com",
            times: 5,
            category: "green",
            carbon: 511.78
        },
        {
            rank: 10,
            domain: "facebook",
            url: "tumhare.com",
            times: 9,
            category: "semi-green",
            carbon: 121.56
        },
        {
            rank: 11,
            domain: "wikipedia",
            url: "koibhi.com",
            times: 2,
            category: "semi-green",
            carbon: 1.8
        },
        {
            rank: 12,
            domain: "hastagio",
            url: "chalore.com",
            times: 1,
            category: "non-green",
            carbon: 23.8
        },
    ];
    res.render("ranking", { visitedWebsites: visitedWebsites });
});

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})