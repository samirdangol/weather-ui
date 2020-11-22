import React, { Component } from 'react'
import './App.css'
import Weather from './components/Weather'

class App extends Component {

  state = {
    data: [
      {
        "zipCode": "98012",
        "temparature": 50
      },
      {
        "zipCode": "98033",
        "temparature": 60
      },
      {
        "zipCode": "98006",
        "temparature": 70
      }
    ]
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then((data) => {
      this.setState({ contacts: data })
    })
    .catch(console.log)
  }

  render() {
    return (
      <div className="App">
        <h1>Hello, React!</h1>    

        <Weather data={this.state.data} />
      </div>
    );
  }
}

export default App