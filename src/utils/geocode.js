const request = require('postman-request')

var geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmFjdWNhbXBpIiwiYSI6ImNrYWN2enk4MDAwenMzNWxkMjM3NDFzaDIifQ.qHs8pWwNSvPznkuoQ3s_KA&limit=1`

    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect geocode services', undefined)
        } else if (body.features.length < 1) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                loc: body.features[0].place_name,
                lat: body.features[0].center[1],
                long: body.features[0].center[0]
            })
        }
    })

}

module.exports = geocode