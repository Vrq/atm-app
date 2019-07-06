import React from 'react';
import './App.css';
import AtmMap from './components/AtmMap'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      atmResults: {},
      pinPosition: {
        lat: 51.505,
        lng: -0.09,
      },
      positionRadius: 4000
    }
  }

  // componentDidMount() {
  //   this.callApi(this.state.pinPosition, this.state.positionRadius)
  //     .then(res => {
  //       this.setState({ atmResults: res })
  //     })
  //     .catch(err => console.log(err));
  // }

  callApi = async (pinPosition, positionRadius) => {
    const response = await fetch("/api/atms/lat/" + pinPosition.lat + "/long/" + pinPosition.lng + "/radius/" + positionRadius)
    const text = await response.text();
    return JSON.parse(text);
  };

  updatePinPosition = newPosition => {
    this.callApi(newPosition, this.state.positionRadius)
      .then(res => {
        this.setState({ atmResults: res })
      })
      .catch(err => console.log(err));
    this.setState({ pinPosition: newPosition })
  }

  updateRadius = evt => {
    const newRadius = evt.target.value
    console.log("radius " + newRadius)
    this.callApi(this.state.pinPosition, newRadius)
      .then(res => {
        this.setState({ atmResults: res })
      })
      .catch(err => console.log(err));
    this.setState({ positionRadius: newRadius })
  }

  render() {
    return (
      <div className="App">
        <AtmMap
          atmData={this.state.atmResults}
          pinPosition={this.state.pinPosition}
          positionRadius={this.state.positionRadius}
          updatePinPosition={this.updatePinPosition}
          updateRadius={this.updateRadius}
        />
      </div>
    );
  }
}

export default App;
