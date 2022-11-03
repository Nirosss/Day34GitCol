import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onChooseLoc = onChooseLoc
window.onDeleteLoc = onDeleteLoc
window.onCopyLoc = onCopyLoc
window.onAddressSearch = onAddressSearch

function onInit() {
    // const params = new Proxy(new URLSearchParams(window.location.search), {
    //     get: (searchParams, prop) => searchParams.get(prop),
    // })
    // const lat = params.lat
    // const lng = params.lng
    mapService
        .initMap()
        .then(() => {
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
        // let locsHTML = '<ul>'
        let locsHTML ='<table class="rwd-table">'
        locs.map((loc) => {
            const { id, lat, lng, name } = loc
            locsHTML += `
            <tr>
                <td class="place-name">${name}</td>
                <td><button class="table-btn" onclick="onChooseLoc(${lat}, ${lng})">GoTo</button></td>
                <td><button class="table-btn" onclick="onCopyLoc(${lat}, ${lng})")>Copy Link</button></td>
                <td><button class="table-btn" onclick="onDeleteLoc(${id})">Delete</button></td>
            </tr>`
            mapService.addMarker({ lat, lng }, name)
        })
        locsHTML += '</table>'
        document.querySelector('.container').innerHTML = locsHTML
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
    document.querySelector(
        '.user-pos'
    ).innerText = `Latitude: ${lat} - Longitude: ${lng}`
    mapService.panTo(lat, lng)
}

function onDeleteLoc(id) {
    const { lat, lng } = locService.deleteLoc(id)
    onGetLocs()
}

function onCopyLoc(lat, lng) {
    navigator.clipboard.writeText(
        `https://github.io/Nirosss/Day34GitCol/index.html?lat=${lat}&lng=${lng}`
    )
}

function onAddressSearch(ev){
    ev.preventDefault()
    let address = ev.target.search.value
    mapService.codeAddress(address)
}