import React from 'react'
import AtmMap from './components/AtmMap'
import consts from './consts'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      atmResults: [],
      pinPosition: consts.initialPosition,
      positionRadius: consts.initialRadius
    }
  }

  callApi = async (pinPosition, positionRadius) => {
    const response = await fetch("/api/atms/lat/" + pinPosition.lat + "/long/" + pinPosition.lng + "/radius/" + positionRadius)
    const text = await response.text();
    return JSON.parse(text);
  };

  updatePinPosition = newPosition => {
    this.callApi(newPosition, this.state.positionRadius)
      .then(res => {
        this.setState({ atmResults: res.data[0].Brand[0].ATM })
      })
      .catch(err => console.log(err));
    this.setState({ pinPosition: newPosition })
  }

  updateRadius = evt => {
    const newRadius = evt.target.value
    this.callApi(this.state.pinPosition, newRadius)
      .then(res => {
        this.setState({ atmResults: res.data[0].Brand[0].ATM })
      })
      .catch(err => console.log(err));
    this.setState({ positionRadius: newRadius })
  }

  render() {
    return (
      <React.Fragment>
        <AtmMap
          atmResults={this.state.atmResults}
          pinPosition={this.state.pinPosition}
          positionRadius={this.state.positionRadius}
          updatePinPosition={this.updatePinPosition}
          updateRadius={this.updateRadius}
        />
      </React.Fragment>
    );
  }
}

export default App;
