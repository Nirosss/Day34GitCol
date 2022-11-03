import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    addLoc,
    deleteLoc,
    setLocationName
}
const LOCATIONS_KEY = 'localLocations'
const locs = storageService.loadFromStorage(LOCATIONS_KEY) || [
    {
        id: 1,
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        address: 'Sderot HaOranim 1, Ramat Gan, Israel',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    },
    {
        id: 2,
        name: 'Neveragain',
        lat: 39.013273088627436,
        lng: 125.71467127166045,
        address:'Pyongyang, North Korea',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    },
]

function getLocs() {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     resolve(locs)
        // }, 2000)
        resolve(locs)
    })
}

function addLoc(name,address, lat, lng) {
    const id = Math.random() * (locs.length + 1)
    const createdAt = Date.now()
    const updatedAt = createdAt
    locs.unshift({ id, name, lat, lng,address, createdAt, updatedAt })
    _updateLocalStorage(LOCATIONS_KEY, locs)
    onGetLocs()
}

function _updateLocalStorage(LOCATIONS_KEY, locs) {
    storageService.saveToStorage(LOCATIONS_KEY, locs)
}

function deleteLoc(id) {
    for (var i = 0; i < locs.length; i++) {
        if (locs[i].id === id) {
            const currLoc = locs[i]
            locs.splice(i, 1)
            _updateLocalStorage(LOCATIONS_KEY, locs)
            return currLoc
        }
    }
}

function setLocationName(name){
    locs[0].name = name
    onGetLocs()
}