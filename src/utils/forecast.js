const request = require('request')

const forecast = (lat,lon,callback) => {
    const url = 'https://api.weatherbit.io/v2.0/current?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(lon)+'&key=e2aefa9bc05747c99762af7c9ee23fb6'

    request({url, json:true},(error,{body}=response)=>{
        if (error){
            callback('User not connected',undefined)
        }else if(body.error){
            callback('invalid lattitude and longitude', undefined)
        }else{
            callback(undefined, 'The relative humidity is '+ body.data[0].rh +' while the pressure is '+body.data[0].pres)
        }
    })
}




module.exports= forecast