import React, {useEffect} from 'react';
import './App.css';
import './reset.css';
import jqueryRender from './jquery/main';
import $ from 'jquery';
window.$ = $;

function App() {

  useEffect(() => {
    jqueryRender()
  })

  return (
    <div className="App">
      <header>
      <img className="logo" src="https://s3.amazonaws.com/codecademy-content/courses/intermediate-javascript-requests/wanderlust/logo.svg" alt="logo" />
    </header>
    <main>
      <h1 className='h1'>Where do you want to land?</h1>
      <form className='form' autoComplete="off">
        <input type="text" id="city" />
        <button id="button" type="submit">Submit</button>
      </form>
    </main>
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
