export const locService = {
    getLocs, addLoc
}
const LOCATIONS_KEY = 'localLocations'
const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
]

function getLocs() {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     resolve(locs)
        // }, 2000)
        resolve(locs)
    })
}

function addLoc(name, lat, lng){
    console.log('we got', name,lat,lng)
    locs.push({name,lat,lng})
     _updateLocalStorage(LOCATIONS_KEY, locs)
    onGetLocs()
}

function _updateLocalStorage(LOCATIONS_KEY, locs){
    saveToStorage(LOCATIONS_KEY, locs)

}