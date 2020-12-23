const request = require('request')

const forecast = (latitude, longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=77961c3e9504d739a2b38dd436b44d22&query='+latitude+','+longitude+'&units=f'

    request({url: url, json: true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find location.', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+'. It\'s currently '+body.current.temperature+ ' degree.')
        }
    })
}

module.exports = forecast