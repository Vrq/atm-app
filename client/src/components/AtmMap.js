import Leaflet from 'leaflet';
import React, { createRef } from 'react';
import { Circle, Map, Marker, Popup, TileLayer } from 'react-leaflet';

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'

class AtmMap extends React.Component {
  state = {
    center: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 13,
  }
  userMapPinRef = createRef()


  updatePosition = () => {
    const marker = this.userMapPinRef.current
    if (marker != null) {
      this.props.updatePinPosition(marker.leafletElement.getLatLng())
    }
  }


  render() {
    let position = [51.5232323, -0.01323232];
    const pinPosition = [this.props.pinPosition.lat, this.props.pinPosition.lng]

    const maptilerTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    var greenIcon = Leaflet.icon({
      iconUrl: 'https://img.icons8.com/office/80/000000/marker.png',

      iconSize: [65, 65], // size of the icon    
    });
    return (
      <div id="map-container">
        <Map id="map-component" center={position} zoom={12} zoomSnap={0.5}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url={maptilerTiles}
          />
          <Circle center={pinPosition} fillColor="blue" radius={8200} />
          <Marker
            icon={greenIcon}
            draggable={true}
            onDragend={this.updatePosition}
            position={pinPosition}
            ref={this.userMapPinRef}>
          </Marker>
          {this.props.atmData.data && this.props.atmData.data[0].Brand[0].ATM.map(atmResult => {
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