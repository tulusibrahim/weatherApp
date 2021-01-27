'use strict'
let negara = document.getElementById('negara')
let daerah = document.getElementById('daerah')
let ket = document.getElementById('ket')
let background = document.getElementById('background')
let temp = document.getElementById('temp')

let position = navigator.geolocation.getCurrentPosition(function (res) {
    let latitude = res.coords.latitude
    let longitude = res.coords.longitude
    $.ajax({
        url: 'https://geocode.xyz/' + latitude + ',' + longitude + '?json=1',
        success: function (res) {
            daerah.innerText = res.region
            negara.innerText = res.country
            console.log(res)

            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + res.city + '&appid=c8d11d9742060d8f1801d3e79870b8b4',
                success: function (res) {
                    console.log(res)
                    let realtemp = res.main.temp - 273.15
                    let celcius = res.main.feels_like - 273.15
                    let buatkapital = res.weather[0].description
                    let finalkapital = buatkapital.replace(/^\w/, (c) => c.toUpperCase());
                    temp.innerText = finalkapital + ', ' + realtemp.toFixed(1) + "°C"
                    ket.innerText = "Feels like " + celcius.toFixed(1) + "°C"

                    $.ajax({
                        url: 'https://api.pexels.com/v1/search?query=' + res.weather[0].description + '&orientation=potrait&per_page=40',
                        headers: {
                            'Authorization': '563492ad6f91700001000001bfba0083a5224399b4716a80ceacbfcb'
                        },
                        dataType: 'json',
                        crossDomain: true,
                        success: function (res) {
                            console.log(res)
                            let randomnum = Math.floor(Math.random() * 50 + 1)
                            background.style.backgroundImage = `url(${res.photos[randomnum].src.portrait})`
                        },
                        error: function () {
                            background.style.zIndex = '3'
                            background.style.color = 'black'
                            background.innerText = "Please refresh page :("
                        }
                    })
                },
                error: function () {
                    background.style.zIndex = '3'
                    background.style.color = 'black'
                    background.innerText = "Please refresh page :("
                }
            })
        },
        error: function () {
            background.style.zIndex = '3'
            background.style.color = 'black'
            background.innerText = "Please refresh page :("
        }
    })
})
