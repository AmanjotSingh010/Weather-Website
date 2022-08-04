let fu ={
    fetchfu: function (city) {
        fetch('https://api.openweathermap.org/data/2.5/forecast?q=' 
        + city + '&appid=' + this.apikey
        )
        .then(response => response.json())
        .then(data => this.disply(data));
    },

    disply: function (data){
        let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;

        timezone.innerHTML = data.timezone;
        countryEl.innerHTML = data.lat + 'N ' + data.lon + 'E'

        let otherDayFor = ''
        data.daily.forEach((day, idx) => {
            if (idx == 0) {
                currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt * 1000).format('dddd')}</div>
                <div class="temp">Min - ${ Number(data.list[i].main.temp_min - 273.15).toFixed(1) }&#176;C</div>
                <div class="temp">Max - ${Number(data.list[i].main.temp_max - 273.15).toFixed(2)}&#176;C</div>
            </div>
            
            `
            } else {
                otherDayFor += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Min - ${Number(data.list[i].main.temp_min - 273.15).toFixed(1)}&#176;C</div>
                <div class="temp">Max - ${Number(data.list[i].main.temp_max - 273.15).toFixed(2)}&#176;C</div>
            </div>
            
            `
            }
        })


        weatherForecastEl.innerHTML = otherDayFor
    }
}


      