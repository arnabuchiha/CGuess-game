import React, { Component } from 'react';
const GOOGLE_MAP_API_KEY='AIzaSyD_lT8RkN6KffGEfJ3xBcBgn2VZga-a05I';
class Map extends Component{
    googleMapRef=React.createRef()
    constructor(){
        super();
        this.state={
            showMarker:true,
            lat:0,
            lng:0
        }
        this.createMarker=this.createMarker.bind(this)
        
    }
    componentDidMount() {
        
        const googleMapScript = document.createElement('script')
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`
        window.document.body.appendChild(googleMapScript)
    
        googleMapScript.addEventListener('load',()=> {
            this.googleMap = this.createGoogleMap()
            // this.marker = this.createMarker()
            this.geocoder = new window.google.maps.Geocoder;
            this.googleMap.addListener('click', (mapsMouseEvent)=>{
                // console.log(mapsMouseEvent.latLng.lng())
                var position = {lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng()};
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
          style={{ width: '100%', height: '70%' }}
        />
      )
    }
}
export default Map;