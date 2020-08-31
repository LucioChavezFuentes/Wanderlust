import { createVenueHTML, createWeatherHTML, getNecessaryForecast, shuffleArray } from './helpers'

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
  const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5"), $("#venue6")];
  const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
  const $submitFeedback = $('#submitfeedback')



  // Add AJAX functions here:
  const getVenues = async () => {
    const numberOfVeneuesToFetch = 10;
    const city = $input.val()
    const upperDestination = city!.toString()[0].toUpperCase() + city!.toString().slice(1).toLowerCase()
    const urlToFetch = `${url}${city}&limit=${numberOfVeneuesToFetch}&client_id=${clientId}&client_secret=${clientSecret}&v=20190111`
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {

        const jsonResponse = await response.json();

        const allVenues = jsonResponse.response.groups[0].items.map((item: any) => {
          return item.venue
        })

        //suffleArray helps to return a random list of venues to show, current slice config is to to get first five of the "numberOfVeneuesToFetch"
        const numberOfVenuesToShow = 5;
        const selectedVenues: any[] = shuffleArray(allVenues).slice(0, numberOfVenuesToShow);

        const photoPromises = selectedVenues.map((async (venue: any) => {

          const photosUrlToFetch = `https://api.foursquare.com/v2/venues/${venue.id}/photos?group=venue&limit=30&client_id=${clientId}&client_secret=${clientSecret}&v=20190111`
          try {
            const response = await fetch(photosUrlToFetch);
            if (response.ok) {
              const jsonResponse = await response.json();
              //console.log(jsonResponse);
              //console.log(`${jsonResponse.response.photos.items[0].prefix}300x300${jsonResponse.response.photos.items[0].suffix}`)

              return (`${jsonResponse.response.photos.items[0].prefix}300x300${jsonResponse.response.photos.items[0].suffix}`)


            }
          }
          catch (error) {
            console.log(error)
          }

        }))
        const photoSources = await Promise.all(photoPromises);

        photoSources.forEach((photoSource, index) => {
          selectedVenues[index].photoSource = photoSource
        })
        return selectedVenues

      } else {
        $destination.append(`<p>Please type a city inside ${upperDestination} to get the Top Attractions</p>`)
        return []
      }

    }
    catch (error) {
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
      if (response.ok && todayForecResponse.ok) {
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
    catch (error) {
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
  const renderVenues = (venues: any[] | undefined) => {

    const arrayOfVenues: any[] = [];
    const city = $input.val()

    venues!.forEach((venue, index) => {

      const venueIcon = venue.categories[0].icon
      const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`
      let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc, venue.photoSource);
      //console.log(venueContent)
      arrayOfVenues.push(venueContent);

    });

    $venueDivs.forEach(($venue, index) => {
      $venue.append(arrayOfVenues[index]);
    })

    $destination.append(`<h2>${city?.toString()[0].toUpperCase()}${city?.toString().slice(1).toLowerCase()}</h2>`);
  }


  const renderForecast = (days: any) => {

    const city = $input.val()
    if (days !== undefined) {
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
    $submitFeedback.empty();

    if ($input.val() !== '') {

      $container.css("visibility", "visible");

      getVenues()
        .then((venues) => {
          renderVenues(venues);
        })
        .catch((error) => {
          console.error(error)
        })

      getForecast().then((days) => {
        renderForecast(days);
      })

    } else {
      $container.css("visibility", "hidden");
      $submitFeedback.append('Please write a city or country before submitting')
    }
    //TODO: ¿Why returning false?
    return false;
  }

  $submit.click(executeSearch)

}

export default jqueryRender