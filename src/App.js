import React, { Component } from 'react'
import './App.css'
const { REACT_APP_API_BASE_URL } = process.env;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      errorMessage: '',
      value: '',
      responseMessage: ''
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

        this.setState({ responseMessage: 'inserted' })
        
        const newList = this.state.weather.filter(w => w.zipCode !== data.zipCode);
        newList.push(data);
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
        
    <h1>Hello, React! {REACT_APP_API_BASE_URL}</h1>

        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Enter Zip:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Add" />
          </form>
          <div>{this.state.value} {this.state.responseMessage}</div>
        </div>

        <div>
          {this.state.weather.map((data) => {
            return (
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{data.zipCode}</h5>
                  <p class="card-text">{data.temparature} F</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App