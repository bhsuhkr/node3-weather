const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// core module
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// Define paths for express confid
const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Bohyun Suh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bohyun Suh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Bohyun Suh',
        helpText: 'This is some text.'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

// only one respone can be done for one request!!!
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    // casuing error if if-statement runs - running "send" function twice => return statement or else
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Bohyun Suh',
        errorMessage: 'Help article not found.'
    })
})

// wild card text
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bohyun Suh',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})


// first parameter = route
// second parameter = what to do with the route
// request , response

// never going to run
// app.get('', (req, res)=> {
//     res.send('<h1>Weather</h1>') // send back something to requester
// })

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'Bo',
//         age: 28
//     },{
//         name: 'Sandy',
//         age: 25
//     }])
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About<h1>')
// })