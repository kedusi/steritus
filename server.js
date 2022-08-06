const express = require('express'),
    app = express(),
    port = process.env.port || 5000,
    mongoose = require('mongoose'),
    Sterilizer = require('./api/models/steritusModel'),
    bodyParser = require('body-parser'),
    path = require('path')
require('dotenv').config()

mongoose.connect(process.env.DB).catch(err => console.log('Connection error DB!', err))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/index.js', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.js'))
})

const routes = require('./api/routes/steritusRoutes')
routes(app)
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})