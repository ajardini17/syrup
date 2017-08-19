// import React, { Component } from 'react';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// export class MapContainer extends Component {
// render() {
//   console.log(this)
//     return (
//       <Map google={this.props.google} zoom={14}>
        
//         <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />

//         <InfoWindow onClose={this.onInfoWindowClose}>
//             <div>
//               {/* <h1>{this.state.selectedPlace.name}</h1> */}
//             </div>
//         </InfoWindow>
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAKQMElAKkLBpZNU5T5j4KHx4v8VMyBTKI'
// })(MapContainer)
import React, {Component} from 'react';
import UploadSection from './UploadSection.js'

const INITIAL_LOCATION = {
  address: 'London, United Kingdom',
  position: {
    latitude: 51.5085300,
    longitude: -0.1257400
  }
};

const INITIAL_MAP_ZOOM_LEVEL = 8;

const ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

class MapContainer extends Component{
  constructor(){
    super()
    this.state = {
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address,
      address : '',
      latitude: 0,
      longitude: 0,
      toggle : false

    }
    this.geocodeAddress = this.geocodeAddress.bind(this)
    this.addressOnChange = this.addressOnChange.bind(this)
    this.setSearchInputElementReference = this.setSearchInputElementReference.bind(this)
    this.setMapElementReference = this.setMapElementReference.bind(this)    
  }
  geocodeAddress(address) {
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      if (status === google.maps.GeocoderStatus.OK) {

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false,
          latitude: results[0].geometry.bounds.b.b,
          longitude: results[0].geometry.bounds.f.f
        });
        //console.log('this is the results', this.state)
        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      });

      this.map.setCenter({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

      this.marker.setPosition({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

    }.bind(this));
  }
  addressOnChange(e){
    //console.log(e.target.value, 'hello')
    e.preventDefault();
    var address = e.target.value
    this.setState({
      address : this.geocodeAddress(e.target.value),
      toggle: true
    }, ()=> {

    })
    //this.geocodeAddress(address);
   
  }
  componentDidMount(){
    var mapElement = this.mapElement;
    //console.log(mapElement, 'hello')
    this.map = new google.maps.Map(mapElement, {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.geocoder = new google.maps.Geocoder();
  }

  setSearchInputElementReference(inputReference) {
    //inputReference.preventDefault();
    this.searchInputElement = inputReference;
  }

  setMapElementReference(mapElementReference) {
    //mapElementReference.preventDefault();
    this.mapElement = mapElementReference;
  }

  render() {
    console.log(this.state)
    return (
      <div className="container">

        <div className="row">
          <div className="col-sm-12">

            <form className="form-inline" onChange={(e)=> this.addressOnChange(e)}>
              <div className="row">
                <div className="col-xs-8 col-sm-10">

                  <div className="form-group">
                    <label className="sr-only" htmlFor="address">Address</label>
                    <input type="text" className="form-control input-lg" id="address" placeholder="London, United Kingdom" ref={this.setSearchInputElementReference} required />
                  </div>

                </div>
                <div className="col-xs-4 col-sm-2">

                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                </div>
              </div>
            </form>

          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">

            {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}

            <div className="map" ref={this.setMapElementReference}></div>
            
          </div>
        </div>
        {this.state.toggle === true ? <UploadSection history={this.props.history} latitude={this.state.latitude} longitude={this.state.longitude}/> : null}
      </div>
    );
  }
};

export default MapContainer;