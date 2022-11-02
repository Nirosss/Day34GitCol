import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    addLoc,
    deleteLoc,
}
const LOCATIONS_KEY = 'localLocations'
const locs = storageService.loadFromStorage(LOCATIONS_KEY) || [
    {
        id: 1,
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        createdAt: Date.now(),
        updatedAt: createdAt,
    },
    {
        id: 2,
        name: 'Neveragain',
        lat: 32.047201,
        lng: 34.832581,
        createdAt: Date.now(),
        updatedAt: createdAt,
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

function addLoc(name, lat, lng) {
    const id = Math.random() * (locs.length + 1)
    const createdAt = Date.now()
    const updatedAt = createdAt
    locs.push({ id, name, lat, lng, createdAt, updatedAt })
    _updateLocalStorage(LOCATIONS_KEY, locs)
    onGetLocs()
}

function _updateLocalStorage(LOCATIONS_KEY, locs) {
    storageService.saveToStorage(LOCATIONS_KEY, locs)
}

function deleteLoc(id) {
    for (var i = 0; i < locs.length; i++) {
        if (locs[i].id === id) {
            locs.splice(i, 1)
            _updateLocalStorage(LOCATIONS_KEY, locs)
            return
        }
    }
}
