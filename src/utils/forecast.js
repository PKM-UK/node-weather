const request = require("request")

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=210b6f64d0b58b847b6e4585632b09e6&query=" + lat + "," + long

    const options = {
        url, /* property shorthand syntax awesomah powah */
        json: true
    }

    console.log('Requesting ' + url)

    request(options, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Unable to find weather forecast: " + JSON.stringify(body.error), undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.weather_descriptions[0] + ' and ' + body.current.temperature + 'C')
        }
    })
}

module.exports = forecast