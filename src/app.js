const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT

const pubdir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(pubdir))
hbs.registerPartials(partialPath)



app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app',
        name: 'Adigwe Godswill'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Adigwe Godswill'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        help: 'help example page',
        name: 'Adigwe Godswill'
    })
})


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if(error){
            return res.send({
                Error: 'error'
            })
        }else{
            forecast(Latitude,Longitude, (error, forecastdata) => {
                if(error){
                    return res.send({
                        Error: 'Lat and Lon error'
                    })
                }else{
                    res.send({
                        forcast: forecastdata,
                        Location: Location,
                        address: req.query.address
                    })
                }

            })
        }
    })
})

app.get('',(req,res)=>{
    res.render('index')
})

app.get('*',(req,res)=>{
    res.render('404',{
        name: 'Godswill',
        title: 'Error 404'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port '+ port)
})