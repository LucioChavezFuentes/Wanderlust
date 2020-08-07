import dayjs from 'dayjs';
//import {weekDays} from '../jquery/main';

interface Forecast {
  dt: number;
  dt_txt: string;
}

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const createVenueHTML = (name : string, location: any, iconSource: any, photoSource: any) => {
    return `<h2 class="venue-name" >${name}</h2>
    <img class="venueimage" src="${iconSource}" alt='Image not available for now' />
    <div class="venueAddress" >
      <h3 class="wordAddress" >Address:</h3>
      <p>${location.address || ''}</p>
      <p>City or Town: ${location.city || 'Not Specified' } </p>
        <p>State: ${location.state || 'Not Specified'}</p>
      <p>${location.country}</p>
    </div>
  <img class="photoimage" src="${photoSource}" alt='Photo not available for now' />`;
  }
  
export const createWeatherHTML = (currentDay : any) => {
    //console.log(weekDays[((new Date(currentDay.date)).getDay()) +1]
    const weatherDescription = currentDay.weather[0].description

    return `
      <h2>${weekDays[(dayjs.unix(currentDay.dt)).day()]}</h2>
      <h2>${dayjs.unix(currentDay.dt).format('DD/MMM/YYYY')}</h2>
      <h2> High: ${kelvinToFahrenheit(currentDay.main.temp_max)} °F </h2>
      <h2> Low: ${kelvinToFahrenheit(currentDay.main.temp_min)} °F </h2>
      <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png" class="weathericon" />
      <h2>${weatherDescription[0].toUpperCase()}${weatherDescription.slice(1)}</h2>
     `;
  }

export const getNecessaryForecast = (listForecast : Forecast[] | undefined, todayForecast: any) => {

  if(listForecast !== undefined) {
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
        console.error(`Matching for the ${index} day not found`)
        throw new Error(`Matching for the ${index} day not found`)
        
      } else {
        console.error("Unknown")
        throw new Error("Unknown")
      }
  });

  return forecastDays

  } else {
    console.error('List of Forecast has not been provided')
    /*return {
      error: 'List of Forecast has not been provided'
    }*/
}}

const kelvinToFahrenheit = (k: number) => ((k - 273.15) * 9 / 5 + 32).toFixed(0);