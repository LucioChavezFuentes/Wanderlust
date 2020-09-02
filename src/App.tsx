import React, {useEffect, useState} from 'react';
import './App.css';
import './reset.css';
import jqueryRender from './jquery/main';

//material ui
import CircularProgress from '@material-ui/core/CircularProgress';

//jquery
import $ from 'jquery';
window.$ = $;

function App() {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    jqueryRender(setLoading)
  }, [])

  return (
    <div className="App">
      <header>
      <img className="logo" src="https://s3.amazonaws.com/codecademy-content/courses/intermediate-javascript-requests/wanderlust/logo.svg" alt="logo" />
    </header>
    <main>
      <h1 className='h1'>Where do you want to land?</h1>
      <form className='form' autoComplete="off">
        <input type="text" id="city" />
        <button id="button" type="submit">Let's Fly!</button>
      </form>
    </main>
    <div style={{display: loading ? 'block' : "none", width: '100%', margin: '0 auto', textAlign: 'center',/* position: 'absolute', left: '45%'*/ }}>
      <CircularProgress size='100px' />
    </div>
    
    <p id='submitfeedback'></p>
    <div className="container">
    <div id="destination">

    </div>
    <div className="sectiontitle">
      <h2>WEATHER</h2>
    </div>
    <section id="weather">

        <div className="weather" id="weather1">

        </div>
        <div className="weather" id="weather2">

        </div>
        <div className="weather" id="weather3">

        </div>
        <div className="weather" id="weather4">

        </div>

    </section>
    <div className="sectiontitle">
      <h2>TOP ATTRACTIONS</h2>
    </div>
      <section id="venues">
        <div className="venue" id="venue1">

        </div>
        <div className="venue" id="venue2">

        </div>
        <div className="venue" id="venue3">

        </div>
        <div className="venue" id="venue4">

        </div>
        <div className="venue" id="venue5">

        </div>
      </section>
    </div>
    </div>
  );
}

export default App;
