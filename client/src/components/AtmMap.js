import Leaflet from 'leaflet';
import React, { createRef } from 'react';
import { Circle, Map, Marker, Popup, TileLayer } from 'react-leaflet';
import consts from '../consts'

Leaflet.Icon.Default.imagePath = consts.leafletDefaultIcon
const pinIcon = Leaflet.icon({
  iconUrl: 'https://img.icons8.com/office/80/000000/map-pin.png',
  iconAnchor: [32, 65],
  iconSize: [65, 65],
});

class AtmMap extends React.Component {
  userMapPinRef = createRef()

  updatePosition = () => {
    const marker = this.userMapPinRef.current
    if (marker != null) {
      this.props.updatePinPosition(marker.leafletElement.getLatLng())
    }
  }

  render() {
    const pinPosition = [this.props.pinPosition.lat, this.props.pinPosition.lng]
    return (
      <div id="map-container" className="text-center">
        <h2>Nearby ATM finder 🏧</h2>
        <h4>Drag the red pin to pick your position 📍 Use the slider to change the radius 🎚</h4>
        <div className="radius-input">
          <input className="radius-input-slider" onChange={this.props.updateRadius} value={this.props.positionRadius} type="range" min="2000" max="17500" step="1" />
          <div>Radius: {this.props.radiusDisplay}</div>
          <button onClick={()=> this.props.changeUnitType("metric")} className="unit-change-button">Use meters</button>
          <button onClick={()=> this.props.changeUnitType("imperial")} className="unit-change-button">Use miles</button>
        </div>
        <Map id="map-component" center={pinPosition} zoom={12}>
          <TileLayer attribution={consts.tileCredits} url={consts.osmTiles} />
          <Circle center={pinPosition} fillColor="blue" radius={this.props.positionRadius} />
          <Marker icon={pinIcon} draggable={true} onDragend={this.updatePosition} position={pinPosition} zIndexOffset={9000} ref={this.userMapPinRef} />
          {this.props.atmResults.map(atmResult => {
            const atmCoords = atmResult.Location.PostalAddress.GeoLocation.GeographicCoordinates
            let atmPosition = [atmCoords.Latitude, atmCoords.Longitude];

            return <Marker position={atmPosition}>
              <Popup closeButton={false} maxWidth={500} >
                <div>
                  <h2>🏧 [HSBC] {atmResult.Location.PostalAddress.StreetName}</h2>
                </div>
              </Popup>
            </Marker>
          })}
        </Map>
      </div>
    )
  }
}

export default AtmMap