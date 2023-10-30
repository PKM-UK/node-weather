const geocode = (cityname, callback) => {
    setTimeout(() => {
        if (cityname !== 'Hitchin' && cityname !== 'Florida') {
            return callback('Unrecognised place')
        }
        else if (cityname === 'Hitchin') {
            callback(
                undefined, {latitude: 51, longitude: 0, location: 'Hyccyn'}
            )
        }
        else if (cityname === 'Florida') {
            callback(
                undefined, {latitude: 28, longitude: -81, location: 'Flow Rida'}
            )
        } 
    }, 1000)
}

module.exports = geocode
