import { createVenueHTML, createWeatherHTML } from './helpers'

function jqueryRender(setLoading: any) {

  const venuesForecastURL = 'https://i2xcyaimz0.execute-api.us-west-1.amazonaws.com/Prod/getVenuesAndForecast/'

  // Page Elements
  const $input = $('#city');
  const $submit = $('#button');
  const $destination = $('#destination');
  const $container = $('.container');
  const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5"), $("#venue6")];
  const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
  const $submitFeedback = $('#submitfeedback')

  // Add AJAX functions here:
  const getVenuesAndForecast = async () => {
    const city = $input.val()
    const urlToFetch = `${venuesForecastURL}${city}`

    const response = await fetch(urlToFetch)

    try{
      const jsonResponse = await response.json();
      return jsonResponse
    }
    catch(error) {
      console.error(error)
    }
  }

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

    setLoading(false)
  }


  const renderForecast = (days: any) => {
    
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
    setLoading(true)
    $venueDivs.forEach(venue => venue.empty());
    $weatherDivs.forEach(day => day.empty());
    $destination.empty();
    $submitFeedback.empty();

    if ($input.val() !== '') {
      
      $container.css("visibility", "visible");

      getVenuesAndForecast().then((res) => {
        renderVenues(res.venues)
        renderForecast(res.forecast)
      })
      .catch(error => {
        console.error(error)
      })

    } else {
      $container.css("visibility", "hidden");
      $submitFeedback.append('Please write a city or country before submitting')
      setLoading(false)
    }
    //TODO: ¿Why returning false?
    return false;
  }

  $submit.click(executeSearch)

}

export default jqueryRender