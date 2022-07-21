const express = require('express'),
    app = express(),
    port = process.env.port || 5000,
    mongoose = require('mongoose'),
    Sterilizer = require('./api/models/steritusModel'),
    bodyParser = require('body-parser')
require('dotenv').config()

mongoose.connect(process.env.DB)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routes = require('./api/routes/steritusRoutes')
routes(app)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})