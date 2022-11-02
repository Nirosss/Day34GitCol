import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onChooseLoc = onChooseLoc

function onInit() {
    mapService
        .initMap()
        .then(() => {
            console.log('Map is ready')
            onGetLocs()
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 }, 'Hello World')
}

function onGetLocs() {
    locService.getLocs().then((locs) => {
        console.log('Locations:', locs)
        // document.querySelector('.locs').innerText = JSON.stringify(
        //     locs,
        //     null,
        //     2
        // )
        let locsHTML = '<ul>'
        locs.map((loc) => {
            const { lat, lng, name } = loc
            locsHTML += `<li><button onclick="onChooseLoc(${lat}, ${lng})">${name}</button></li>`
            mapService.addMarker({ lat, lng }, name)
        })
        locsHTML += '</ul>'
        document.querySelector('.locs').innerHTML = locsHTML
    })
}

function onGetUserPos() {
    getPosition()
        .then((pos) => {
            console.log('User position is:', pos.coords)
            document.querySelector(
                '.user-pos'
            ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            mapService.addMarker(
                {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                },
                'My Position'
            )
        })
        .catch((err) => {
            console.log('err!!!', err)
        })
}

function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}

function onChooseLoc(lat, lng) {
    mapService.panTo(lat, lng)
}
