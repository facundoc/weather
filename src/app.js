const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()

//Paths for express
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars
hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
app.set('views', viewsPath)


//setup static directory
app.use(express.static(publicDirectory))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather APP',
        name: 'Facundo Campi'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About page',
        name: 'Facundo Campi'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        message: "I'm trying to help you with this message", 
        name: 'Facundo Campi'
    })
})

app.get('/weather', (req, res)=> {

    if (!req.query.s){
        return res.send({
            error: 'You must provide a location'
        })   
    } 

    geocode(req.query.s, (error, {lat, long, loc} = {})=> {
        if (error) {
            return res.send({
                error
            });
        }
        weather(lat, long, (error, {temp, fl, desc} = {}) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: `The weather in ${loc} is ${desc}, with a temperature of ${temp} that feels like ${fl}`,
                loc,
                temp,
                fl,
                desc
            })
        })
        
    })

    // res.send({
    //     address: req.query.s,
    //     forecast: 20,
    //     location: 'Buenos Aires'
    // }) 
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Article not found',
        name: 'Facundo Campi'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Facundo Campi'
    })
})

app.listen(3000, ()=>{
    console.log('server is up');
    
})