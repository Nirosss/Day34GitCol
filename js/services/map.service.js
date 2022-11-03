import { locService } from './loc.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    codeAddress
}

// Var that is used throughout this Module (not global)
var geocoder
var gMap
var marker
window.initMap = initMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    return _connectGoogleApi().then(() => {
        geocoder = new google.maps.Geocoder()
        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15,
        })
        gMap.addListener('click', (ev) => {
            const name = prompt('Place name?', 'New Place')
            const lat = ev.latLng.lat()
            const lng = ev.latLng.lng()
            locService.addLoc(name, lat, lng)
            addMarker()
        })
        const locationButton = document.createElement('button')
        locationButton.classList.add('my-location')
        locationButton.innerHTML = `<img src="img/my-location.png" title="Go To Your Location"/>`
        gMap.controls[google.maps.ControlPosition.TOP_CENTER].push(
            locationButton
        )
        locationButton.addEventListener('click', onGetUserPos)
    })
}

function addMarker(loc, title = '') {
    marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: title,
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDuETDc-5x28cmhJpkzqNwLfi_oKVmzT1E'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function codeAddress(address) {
    console.log(address)
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        gMap.setCenter(results[0].geometry.location)
        marker = new google.maps.Marker({
            map: gMap,
            position: results[0].geometry.location
        })
         var lat= (results[0].geometry.location.lat())
         var lng= (results[0].geometry.location.lng())
         locService.addLoc(address, lat, lng)
        } else {
        alert('Geocode was not successful for the following reason: ' + status)
      }
    })
  }
