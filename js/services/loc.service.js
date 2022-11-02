export const locService = {
    getLocs,
    deleteLoc,
}

const locs = [
    { id: 1, name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { id: 2, name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
]

function getLocs() {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     resolve(locs)
        // }, 2000)
        resolve(locs)
    })
}

function deleteLoc(id) {
    for (var i = 0; i < locs.length; i++) {
        if (locs[i].id === id) {
            locs.splice(i, 1)
            return
        }
    }
}
