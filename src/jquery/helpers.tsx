import dayjs from 'dayjs';
//import {weekDays} from '../jquery/main';

interface Forecast {
  dt: number;
  dt_txt: string;
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const createVenueHTML = (name : string, location: any, iconSource: any, photoSource: any) => {
    return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>City or Town: ${location.city}</p>
      <p>State: ${location.state}</p>
    <p>${location.country}</p>
  <img class="photoimage" src="${photoSource}"/>`;
  }
  
export const createWeatherHTML = (currentDay : any) => {
    //console.log(weekDays[((new Date(currentDay.date)).getDay()) +1]
    return `<h2> High: ${kelvinToFahrenheit(currentDay.main.temp_max)}</h2>
      <h2> Low: ${kelvinToFahrenheit(currentDay.main.temp_min)}</h2>
      <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png" class="weathericon" />
  <h2>${currentDay.weather[0].description}</h2>
      <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>
  <h2>${weekDays[dayjs(currentDay.dt).date()]}</h2>`;
  }

export const getNecessaryForecast = (listForecast : Forecast[], todayForecast: any) => {

  const days = Array.from({length: 5}).map((day, index) => {
    return dayjs().add(index, 'day')
  })

  const forecastDays = days.map((day, index) => {

    if(index === 0){
      return todayForecast
    }

    let forecastIndex = 0;
    //let found = false;

    //let forecastDate = dayjs(listForecast[forecastIndex].dt_txt).date()
    let dayDate = day.date()
    //let arrayHasFinished = (forecastIndex >= listForecast.length)

    for(; forecastIndex < listForecast.length; forecastIndex++){
      let forecastDate;
      //This tests if forecast API return dates in seconds (10 length) or miliseconds (seconds * 1000)
      if(listForecast[forecastIndex].dt.toString().length === 10){
        const forecastTime = dayjs.unix(listForecast[forecastIndex].dt)
        forecastDate = forecastTime.date()
      } else {
        forecastDate = dayjs(listForecast[forecastIndex].dt_txt).date()
      }
      
      if(forecastDate === dayDate) {
        return listForecast[forecastIndex]
      }
    }

    /*while(!found && !arrayHasFinished){
      if(forecastDate === dayDate){
        found = true
        return listForecast[forecastIndex]
      } else {
        forecastIndex++
        arrayHasFinished = (forecastIndex >= listForecast.length)
      }
    }*/
    if(forecastIndex >= listForecast.length) {
      console.error("Matching for the next 5 days not found")
      return {}
      
    } else {
      console.error("Unknown")
      return {}
    }
  });

  return forecastDays
}

const kelvinToFahrenheit = (k: number) => ((k - 273.15) * 9 / 5 + 32).toFixed(0);