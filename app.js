window.addEventListener('load', () => {
    let long
    let lat
    let weatherDescription = document.querySelector('.weather-description')
    let location = document.querySelector('.location')
    let temperature = document.querySelector('.temperature')
    let windSpeed = document.querySelector('.wind-speed')
    let humid = document.querySelector('.humidity')
    const temperatureSpan = document.querySelector('.degree-section span')
    const windSpan = document.querySelector('.wind-section span')
    let tempIcon = document.getElementById('temp-icon')
    let degreeSection = document.querySelector('.degree-section')
    let windSection = document.querySelector('.wind-section')


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=e1e7afdd2bc21aeb68681cc955e30fe8`
            
            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const {name} = data
                const {feels_like} = data.main
                const {id, description} = data.weather[0]
                const {speed} = data.wind
                const {humidity} = data.main

                temperature.textContent = Math.round(feels_like * 10) / 10
                location.textContent = name
                weatherDescription.textContent = description
                windSpeed.textContent = Math.round(speed * 10) / 10
                humid.textContent = humidity

                let celsius = (feels_like - 32) * (5 / 9)

                let kilometers = speed * 1.609


                if (id < 250) {
                    tempIcon.src = './icons/tstorms.svg'
                } else if (id < 350) {
                    tempIcon.src = './icons/chancerain.svg'
                } else if (id < 550) {
                    tempIcon.src = './icons/rain.svg'
                } else if (id < 650) {
                    tempIcon.src = './icons/snow.svg'
                } else if (id < 799) {
                    tempIcon.src = './icons/hazy.svg'
                } else if (id === 800) {
                    tempIcon.src = './icons/clear.svg'
                } else if (id >= 801) {
                    tempIcon.src = './icons/cloudy.svg'
                }

                degreeSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C'
                        temperature.textContent = Math.round(celsius * 10) / 10
                    } else  {
                        temperatureSpan.textContent = 'F'
                        temperature.textContent = Math.round( feels_like * 10) / 10
                    }
                })

                windSection.addEventListener('click', () => {
                    if (windSpan.textContent === 'mi/h') {
                        windSpan.textContent = 'km/h'
                        windSpeed.textContent = Math.round(kilometers * 10) / 10
                    } else  {
                        windSpan.textContent = 'mi/h'
                        windSpeed.textContent = Math.round(speed * 10) / 10
                    }
                })

            })
        })

    }
})