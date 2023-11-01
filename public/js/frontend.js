console.log('Clunt side JS!')

//  Challenge:
// Fetch weather  for Hitchin
// if error, print error
// if no error, print forecast

const getForecast = (address) => {
    firstp.textContent = 'Loading forecast for ' + address
    secondp.textContent = ''

    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log('Error: ' + data.error)
                firstp.textContent = 'Error: ' + data.error
                secondp.textContent = ''
            } else {
                console.log(data.forecast + ' in ' + data.location)
                firstp.textContent = 'Location: ' + data.location
                secondp.textContent = 'Forecast: ' + data.forecast
            }
        })
    })
}

const weatherform = document.querySelector('form')
const searchElement = weatherform.querySelector('input')

const firstp = document.querySelector('#message-1')
const secondp = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchterm = searchElement.value
    getForecast(searchterm)
})