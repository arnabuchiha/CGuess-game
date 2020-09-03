import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const GOOGLE_MAP_API_KEY='AIzaSyD_lT8RkN6KffGEfJ3xBcBgn2VZga-a05I';
class Map extends Component{
    googleMapRef=React.createRef()
    constructor(props){
        super(props);
        this.state={
            showMarker:true,
            lat:0,
            lng:0,
            markers:[]
        }
        this.cookies=new Cookies();
        this.ENDPOINT="localhost:5000";
        this.createMarker=this.createMarker.bind(this)
        this.color=["yellow",		 
            "blue",		 
            "green",		 
            "lightblue",		 
            "orange",	 
            "pink",		 
            "purple"]
        
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
                    if (status === window.google.maps.GeocoderStatus.OK) {
                      if (results[0]) {
                         
                        // alert(results[0].formatted_address)
                    }
                      
                    }
                  });
                // console.log(mapsMouseEvent.latLng.lng())
                console.log(mapsMouseEvent)
                var position = {lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng()};
                this.props.socket.emit('mapclicked',{location:position,username:this.cookies.get('username')})
                console.log(position)
                
            },{
                passive: true
              });
            

        },{
            passive: true
          })
        this.props.socket.on('markers',data=>{
            this.setMapOnAll(null);
            var i=0;
            data.forEach(element=>{
                this.addMarker(element.location,element.username,this.color[i]);
                i+=1;
            })
        })
        
    }
    setMapOnAll=(map)=>{
        for (let i = 0; i < this.state.markers.length; i++) {
            this.state.markers[i].setMap(map);
        }
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
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
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
    addMarker=(location,username,color) =>{
        let url = "http://maps.google.com/mapfiles/ms/icons/";
        url += color + "-dot.png";
        const marker = new window.google.maps.Marker({
          position: location,
          icon:{
              url:url
          },
          map: this.googleMap
        });
        var contentString=(`<div style="font-family: 'CustomFont';">${username}</div>`)
        var infowindow=new window.google.maps.InfoWindow({
            content:contentString
        });
        infowindow.open(this.googleMap, marker);
        this.setState({
            markers:[...this.state.markers,marker]
        })
      }
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