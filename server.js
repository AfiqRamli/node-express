const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()
let currentYear = new Date().getFullYear()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

app.use((req,res,next) => {
    var timeStamp = new Date().toString()
    var log = `${timeStamp}: ${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log(err)
        }
    })
    next()
})

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        homeMessage: 'Welcome to this website!'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    })
})

app.listen(port, () => {
    console.log(`App is running at port ${port}`)
})