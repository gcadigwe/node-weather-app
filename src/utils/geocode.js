const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2FyenkiLCJhIjoiY2tlOTV2eGpkMjNheTJ5bGY5OG52dGUyZCJ9.-pb-WsNXoT5dKgs4eCzsDg&limit=1'
    request({url, json:true}, (error,{body}=response) => {
        if(error){
           callback ('unable to connect',undefined)
        }
        else if (body.features.length === 0){
            callback('no result found', undefined)
        }else{
            callback(undefined, {
            Longitude: body.features[0].center[1],
            Latitude: body.features[0].center[0],
            Location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode