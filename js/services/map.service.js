import { locService } from './loc.service.js'

export const mapService = {
  initMap,
  addMarker,
  panTo,
}

// Var that is used throughout this Module (not global)

var gMap
window.initMap = initMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })
    const uluru = { lat: -25.363, lng: 131.044 }
    const contentString = '<h1>HELOO</h1>'
    const infowindow = new google.maps.InfoWindow()

    gMap.addListener('click', (ev) => {
      const name = prompt('Place name?', 'New Place')
      const lat = ev.latLng.lat()
      const lng = ev.latLng.lng()
      const NewPlace = { lat: lat, lng: lng }
      locService.addLoc('name', lat, lng)
      addMarker()
    })
    console.log('Map!', gMap)
  })
}

function addMarker(loc, title = '') {
  var marker = new google.maps.Marker({
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
