const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Server paths
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Boilerplate - tell express we want a templating engine and how it should be set up 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath)) // Mystery! Set index.html as the default response for the root route

// Express handlers for routes
// Functions for each REST type?
// Tell the server how to respond to a GET at a specific route
app.get('', (req, res) => {
    // Render a Handlebars view by name
    res.render('index', {
        title: 'Hweather',
        name: "It me"
    })
})

// Weather route accept an address
// No address: Return an error
// Address: send the static JSON (which one day will be localed weather)

app.get('/weather', (req, res) => {
    // JSON route for use as an API so we send an object not a string

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        }
        forecast(latitude, longitude, (error, fcdata) => {
            if (error) {
                return res.send(error)
            }
            console.log(fcdata)            
            res.send({
                location: req.query.address,
                forecast: fcdata
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errorMessage: 'You must provide a search term'
        })
        
        /* Return on failure is an Express pattern */
    }
    res.send({
        products: []
    })        

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Martyn'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Martin',
        help: 'This is the help message'
    })
})

// ... and finally the routes for everything else not handled

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help page not found. Refer to <a href="/help">help</a>',
        name: 'The Chevalier'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '404: Page not found',
        name: 'Gandalf'
    })
})

// Create a new view for the 404 page including the header and footer partials
// also render a provided help message which depends on routing


// ...and actually start the server (on :3000 which is "a common development port")
app.listen(3000, () => {
    console.log('Server is up on 3000')
})