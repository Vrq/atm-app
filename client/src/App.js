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
    const API_URI = "/api/atms/lat/" + pinPosition.lat + "/long/" + pinPosition.lng + "/radius/" + positionRadius
    const response = await fetch(API_URI)
    return await response.json();
  };

  updatePinPosition = async newPosition => {
    this.setState({ pinPosition: newPosition })
    const atmResponse = await this.callApi(newPosition, this.state.positionRadius)
    this.setState({ atmResults: atmResponse.data[0].Brand[0].ATM })
  }

  updateRadius = async evt => {
    const newRadius = evt.target.value
    this.setState({ positionRadius: newRadius })
    const atmResponse = await this.callApi(this.state.pinPosition, newRadius)
    this.setState({ atmResults: atmResponse.data[0].Brand[0].ATM })
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
