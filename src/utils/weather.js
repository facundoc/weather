const request = require('postman-request')

var weather = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2224100d26111a7724eb81efa75167d3&query=${lat},${long}&units=m`
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                fl: body.current.feelslike,
                desc: body.current.weather_descriptions[0]
            })
        }

    })

}

module.exports = weather