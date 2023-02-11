const express = require('express')
const connectDB = require('./config/db');
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000

connectDB();

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})