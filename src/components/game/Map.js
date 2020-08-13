import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
const GOOGLE_MAP_API_KEY='AIzaSyD_lT8RkN6KffGEfJ3xBcBgn2VZga-a05I';
class Map extends Component{
    googleMapRef=React.createRef()
    constructor(props){
        super(props);
        this.state={
            showMarker:true,
            lat:0,
            lng:0
        }

        this.ENDPOINT="localhost:5000";
        this.createMarker=this.createMarker.bind(this)
        
    }
    componentDidMount() {
        
        const googleMapScript = document.createElement('script')
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
        // googleMapScript.src=`https://maps.googleapis.com/maps/api/staticmap?key=${GOOGLE_MAP_API_KEY}&center=48.26814285239378,-113.94149294602335&zoom=6&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0xebe3cd&style=element:labels.text.fill%7Ccolor:0x523735&style=element:labels.text.stroke%7Ccolor:0xf5f1e6&style=feature:administrative%7Celement:geometry%7Cvisibility:off&style=feature:administrative%7Celement:geometry.stroke%7Ccolor:0xc9b2a6&style=feature:administrative.land_parcel%7Celement:geometry.stroke%7Ccolor:0xdcd2be&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0xae9e90&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x93817c&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0xa5b076&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x447530&style=feature:road%7Cvisibility:off&style=feature:road%7Celement:geometry%7Ccolor:0xf5f1e6&style=feature:road%7Celement:labels.icon%7Cvisibility:off&style=feature:road.arterial%7Celement:geometry%7Ccolor:0xfdfcf8&style=feature:road.highway%7Celement:geometry%7Ccolor:0xf8c967&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0xe9bc62&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0xe98d58&style=feature:road.highway.controlled_access%7Celement:geometry.stroke%7Ccolor:0xdb8555&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x806b63&style=feature:transit%7Cvisibility:off&style=feature:transit.line%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:transit.line%7Celement:labels.text.fill%7Ccolor:0x8f7d77&style=feature:transit.line%7Celement:labels.text.stroke%7Ccolor:0xebe3cd&style=feature:transit.station%7Celement:geometry%7Ccolor:0xdfd2ae&style=feature:water%7Celement:geometry.fill%7Ccolor:0xb9d3c2&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x92998d&size=480x360`
        window.document.body.appendChild(googleMapScript)
    
        googleMapScript.addEventListener('load',()=> {
            
            // this.marker = this.createMarker()
            this.googleMap = this.createGoogleMap()
            // this.googleMap.set('styled_map', this.styledMapType);
            // this.googleMap.setMapTypeId('styled_map');
            this.geocoder = new window.google.maps.Geocoder();
            this.googleMap.addListener('click', (mapsMouseEvent)=>{

        
                this.geocoder.geocode({
                    'latLng': mapsMouseEvent.latLng
                  }, function(results, status) {
                    if (status == window.google.maps.GeocoderStatus.OK) {
                      if (results[0]) {
                         
                        // alert(results[0].formatted_address)
                    }
                      
                    }
                  });
                // console.log(mapsMouseEvent.latLng.lng())
                console.log(mapsMouseEvent)
                var position = {lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng()};
                this.props.socket.emit('mapclicked',{location:position})
                console.log(position)
                
                
                var marker=new window.google.maps.Marker({
                    position: position,
                    map: this.googleMap,
                })
                this.geocoder.geocode({'location':mapsMouseEvent.latLng},(results,status)=>{
                    if (status === 'OK'){
                        var contentString=(`<div style="font-family: 'CustomFont';">${results[0].formatted_address}</div>`)
                        var infowindow=new window.google.maps.InfoWindow({
                            content:contentString
                        });
                        infowindow.open(this.googleMap, marker);
                        console.log(results);
                    }
                })
            });
            

        })
        
    }
    createGoogleMap = () =>
    new window.google.maps.Map(this.googleMapRef.current, {
    zoom: 5,
    center: {
        lat: 43.642567,
        lng: -79.387054,
    },
    disableDefaultUI: true,
    styles: [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#052366"
                },
                {
                    "saturation": "-70"
                },
                {
                    "lightness": "85"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "lightness": "-53"
                },
                {
                    "weight": "1.00"
                },
                {
                    "gamma": "0.98"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "saturation": "-18"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#57677a"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ]
    })
  
    createMarker = (position) =>
      new window.google.maps.Marker({
        position: position,
        map: this.googleMap,
    })
  
    render() {
      return (
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: '100%', height: '70%',borderRadius:"10px" }}
        />
      )
    }
}
export default Map;