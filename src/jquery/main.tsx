import {createVenueHTML, createWeatherHTML, getNecessaryForecast} from './helpers'

function jqueryRender() {

// Foursquare API Info
const clientId = '22GIOHEN3LF32QADSTXTBBOQEURJQNBWOABGZKPYQV34IKPM';
const clientSecret = 'LVAFO05J1XOBKVAIMBQBC4UCLQDE4DMTR3LS4SL453DUSX1C';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';
//Foursquare Photos Info
//const photoUrl = 'https://api.foursquare.com/v2/venues/VENUE_ID/photos'
// APIXU Info
const apiKey = '31e1fcad563a8a38bd05b67f3c5e648e';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"),$("#venue2"),$("#venue3"),$("#venue4"),$("#venue5"), $("#venue6")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];




// Add AJAX functions here:
const getVenues = async () => {
  const numberOfVeneuesToFetch = 5
  const city = $input.val()
  const upperDestination = city!.toString()[0].toUpperCase() + city!.toString().slice(1).toLowerCase()
  const urlToFetch = `${url}${city}&limit=${numberOfVeneuesToFetch}&client_id=${clientId}&client_secret=${clientSecret}&v=20190111`
  try {
    const response = await fetch(urlToFetch);
      if(response.ok){
        //console.log(response);
        const jsonResponse = await response.json();
        //console.log(jsonResponse);
        const venues = jsonResponse.response.groups[0].items.map((item: any) =>{
          return item.venue
        })
         
   const photoPromises = venues.map(( async(venue : any) =>{
            
    const photosUrlToFetch  = `https://api.foursquare.com/v2/venues/${venue.id}/photos?group=venue&limit=30&client_id=${clientId}&client_secret=${clientSecret}&v=20190111`
    try{
      const response = await fetch(photosUrlToFetch);
      if (response.ok){
        const jsonResponse = await response.json();
        //console.log(jsonResponse);
         //console.log(`${jsonResponse.response.photos.items[0].prefix}300x300${jsonResponse.response.photos.items[0].suffix}`)
 
 return (`${jsonResponse.response.photos.items[0].prefix}300x300${jsonResponse.response.photos.items[0].suffix}`)
 
        
      }
    }
    catch(error) {
      console.log(error)
    }
      
        }))
     const photoSources = await Promise.all(photoPromises);   
      
        //console.log(photoSources)
        photoSources.forEach((photoSource,index) =>{
          venues[index].photoSource = photoSource
        })
        console.log(venues);
        return venues

      } else {
        $destination.append(`<p>Please type a city inside ${upperDestination} to get the Top Attractions</p>`)
      }
    
  }
  catch(error){
    console.log(error);
    throw Error(error)
  }
}

const getForecast = async () => {
  const urlToFetch = `${forecastUrl}${$input.val()}&appid=${apiKey}`
  const todayForeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${$input.val()}&appid=${apiKey}`
  try {
    const response = await fetch(urlToFetch);
    const todayForecResponse = await fetch(todayForeUrl);
    if(response.ok && todayForecResponse.ok) {
      //console.log(response)
      const jsonResponse = await response.json();
      const todayForecJson = await todayForecResponse.json()
      //console.log(jsonResponse);
      const listForecast = jsonResponse.list
      //console.log(days);
      const days = getNecessaryForecast(listForecast, todayForecJson)

      return days
    }
  }
  catch(error) {
    console.log(error)
  }
}

/* const getVenuePhotos = async (venue) => {
    const photosUrlToFetch  = `https://api.foursquare.com/v2/venues/${venue.id}/photos?group=venue&limit=30&client_id=${clientId}&client_secret=${clientSecret}&v=20190111`
    try{
      const response = await fetch(photosUrlToFetch);
      if (response.ok){
        const jsonResponse = await response.json();
        //console.log(jsonResponse);
         //console.log(`${jsonResponse.response.photos.items[0].prefix}300x300${jsonResponse.response.photos.items[0].suffix}`)
 
 return `${jsonResponse.response.photos.items[0].prefix}300x300${jsonResponse.response.photos.items[0].suffix}`
 
        
      }
    }
    catch(error) {
      console.log(error)
    }
      }
*/
// Render functions
const renderVenues = (venues : any[]) => {
  
  const arrayOfVenues: any[] = [];
  const city = $input.val()
  
  venues.forEach((venue,index)=>{
    console.log(venue.photoSource);
    //getVenuePhotos(venue).then((photoSource) =>{
        const venueIcon = venue.categories[0].icon
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`
    let venueContent = createVenueHTML(venue.name, venue.location,venueImgSrc,venue.photoSource);
    //console.log(venueContent)
    arrayOfVenues.push(venueContent);
    
    //})
    
   
  });
  //console.log(arrayOfVenues)
  /*$venueDivs.forEach(($venue, index) => {
    // Add your code here:
		const venue = venues[index]
    const venueIcon = venue.categories[0].icon
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`
    let venueContent = createVenueHTML(venue.name, venue.location,venueImgSrc);
    $venue.append(venueContent);
  });
  
  */
  let arrayOfNumRandom : any[] = []
  
  const isNotRandomNumRepeated = (numRandom : any) =>{
    	
     return arrayOfNumRandom.every((num)=>{
    return num !== numRandom;
      })
  };
  
  const isRandomNumRepeated = (numRandom: any) =>{
    	
     return arrayOfNumRandom.some((num)=>{
    return num === numRandom;
      })
  };
  let numRandom = 0;

  const numberOfVenues = arrayOfVenues.length
  //If There are not more venues to show than the available divs the function should not select randomly what venues to show 
  if(numberOfVenues <= $venueDivs.length) {
    $venueDivs.forEach(($venue, index) =>{
      $venue.append(arrayOfVenues[index]);
  })
  } else {
    $venueDivs.forEach(($venue) =>{
  
      numRandom = Math.floor(Math.random()*numberOfVenues)
      console.log(numRandom);
      while(isRandomNumRepeated(numRandom)){
        numRandom = Math.floor(Math.random()*numberOfVenues)
      console.log(numRandom);
      }
      while(isNotRandomNumRepeated(numRandom)){
        arrayOfNumRandom.push(numRandom)
        //console.log(arrayOfVenues[numRandom])
        $venue.append(arrayOfVenues[numRandom]);
      }
    })
  }
    
$destination.append(`<h2>${city?.toString()[0].toUpperCase()}${city?.toString().slice(1).toLowerCase()}</h2>`);
}


const renderForecast = (days: any) => {

  if(days !== undefined) {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
		const currentDay = days[index];
		
    let weatherContent = createWeatherHTML(currentDay);
    
    $day.append(weatherContent);
  });
  } else {
    $weatherDivs[0].append('<p> Forecast not avialable for now. Please try again later </p>')
  }
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues()
    .then((venues) => {
    renderVenues(venues);
  })
    .catch((error) => {
      console.error(error)
    })
  getForecast().then((days) =>{
    renderForecast(days);
  })
  return false;
}

$submit.click(executeSearch)

}

export default jqueryRender