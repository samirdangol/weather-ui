import React, { Component } from 'react'
import './App.css'
import Weather from './components/Weather'

class App extends Component {

  state = {
    weather: [],
    errorMessage: ''
  }

  componentDidMount() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(["98012", "98033", "98043"])
    };

    fetch('https://weather-ui.azurewebsites.net/api/WeatherFunction', requestOptions)
    .then(async response => {
      const data = await response.json();

      if(!response.ok) {
        const error = (data && data.zipCodeWeathers) || response.status;
        return Promise.reject(error);
      }

      this.setState({weather: data.zipCodeWeathers})
    })
    .catch(error => {
      this.setState({errorMessage: error.toString() });
      console.error('There was an error!', error);
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello, React!</h1>    

        <Weather data={this.state.weather} />
      </div>
    );
  }
}

export default App