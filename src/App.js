import React, { Component } from 'react'
import './App.css'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap'

const { REACT_APP_API_BASE_URL } = process.env;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      errorMessage: '',
      value: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.value)
    };

    fetch(REACT_APP_API_BASE_URL + 'api/write', requestOptions)
      .then(async response => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data) || response.status;
          return Promise.reject(error);
        }

        const newList = this.state.weather.filter(w => w.zipCode !== data.zipCode);
        newList.unshift(data);
        this.setState({ weather: newList });
      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });


    event.preventDefault();
  }

  componentDidMount() {
    fetch(REACT_APP_API_BASE_URL + 'api/read')
      .then(async response => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.zipCodeWeathers) || response.status;
          return Promise.reject(error);
        }

        this.setState({ weather: data.zipCodeWeathers })
      })
      .catch(error => {
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello Weather</h1>
        <div className="row d-flex">
          <div className="col-md-3 center">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formZip">
                <Form.Control type="text" placeholder="Enter Zip" size="lg"
                  value={this.state.value} onChange={this.handleChange} />
              </Form.Group>
              <Button type="submit">Search</Button>
            </Form>
          </div>
        </div>

        <h3>Weather Results</h3>
        <div>
          {this.state.weather.map((data) => {
            return (
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{data.city}, {data.country} ({data.zipCode})</h5>
                  <h6>{data.weatherDesc}</h6>
                  <p class="card-text"><strong>{data.temp}°F</strong> temperature from <strong>{data.tempMin}°F</strong> to <strong>{data.tempMax}°F</strong>, wind <strong>{data.wind}</strong>. clouds <strong>{data.cloud}</strong>, <strong>{data.pressure}</strong></p>
                  <h7>Geo coords [{data.latitude}, {data.longitude}], Last updated: {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', dayPeriod: 'short'}).format(new Date(data.asOfDate))}</h7>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          Azure Function URL:  {REACT_APP_API_BASE_URL}
        </div>
      </div >
    );
  }
}

export default App