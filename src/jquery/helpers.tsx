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
    return `<h2> High: ${currentDay.main.maxtemp_f}</h2>
      <h2> Low: ${currentDay.main.mintemp_f}</h2>
      <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png" class="weathericon" />
  <h2>${currentDay.weather[0].description}</h2>
      <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>
  <h2>${weekDays[dayjs(currentDay.dt).date()]}</h2>`;
  }

export const getNecesaryForecast = (listForecast : Forecast[], todayForecast: any) => {

  const days = Array.from({length: 5}).map((day, index) => {
    return dayjs().add(index, 'day')
  })

  const forecastDays = days.map((day, index) => {

    if(index === 0){
      return todayForecast
    }

    let forecastIndex = 0;
    let found = false;

    let forecastDate = dayjs(listForecast[forecastIndex].dt).date()
    let dayDate = day.date()

    while(!found || forecastIndex < listForecast.length){
      if(dayjs(listForecast[forecastIndex].dt_txt).date() ===  day.date() ){
        found = true
        return listForecast[forecastIndex]
      } else {
        forecastIndex++
      }
    }

    if(forecastIndex >= listForecast.length) {
      return  {
        error: 'matching day not found'
        } 
    } else {
      return {
        error: 'Unknown'
      }
    }
  });

  return forecastDays
}