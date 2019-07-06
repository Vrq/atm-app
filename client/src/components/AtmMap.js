import Leaflet from 'leaflet';
import React, { createRef } from 'react';
import { Circle, Map, Marker, Popup, TileLayer } from 'react-leaflet';

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

class AtmMap extends React.Component {
  userMapPinRef = createRef()

  updatePosition = () => {
    const marker = this.userMapPinRef.current
    if (marker != null) {
      this.props.updatePinPosition(marker.leafletElement.getLatLng())
    }
  }

  render() {
    let position = [51.505, -0.085];
    const pinPosition = [this.props.pinPosition.lat, this.props.pinPosition.lng]

    const maptilerTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    var greenIcon = Leaflet.icon({
      iconUrl: 'https://img.icons8.com/office/80/000000/map-pin.png',
      iconAnchor: [32, 65],
      iconSize: [65, 65], 
    });
    return (
      <div id="map-container" className="text-center">

        <h2>Nearby ATM finder 🏧</h2>
        <h4>Drag the red pin to pick your position 📍 Use the slider to change the radius 🎚</h4>
        <h4></h4>
        <div className="radius-input">
          <input className="radius-input-slider" onChange={this.props.updateRadius} value={this.props.positionRadius} type="range" min="1" max="17500" step="10" />
          <div>Radius: {this.props.positionRadius} meters</div>
        </div>
        <Map id="map-component" center={position} zoom={12}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url={maptilerTiles}
          />
          <Circle center={pinPosition} fillColor="blue" radius={this.props.positionRadius} />
          <Marker
            icon={greenIcon}
            draggable={true}
            onDragend={this.updatePosition}
            position={pinPosition}
            zIndexOffset={400}
            ref={this.userMapPinRef}>
          </Marker>
          {this.props.atmData.data && this.props.atmData.data[0] && this.props.atmData.data[0].Brand[0].ATM.map(atmResult => {
            const atmCords = atmResult.Location.PostalAddress.GeoLocation.GeographicCoordinates
            let jobPosition = [atmCords.Latitude, atmCords.Longitude];

            return <Marker position={jobPosition}>
              <Popup closeButton={false} maxWidth={500} >
                <div>{atmResult.Location.PostalAddress.StreetName}</div>
              </Popup>
            </Marker>
          })}
        </Map>
      </div>
    )
  }
}


export default AtmMap