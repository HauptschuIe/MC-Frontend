//import screenConfig from '../../dist/screen-config.json';
const screenConfig = require('../../dist/screen-config.json')

function getDisplayPositionsFromConfig() {
    let displayPositions = []
    Object.keys(screenConfig).forEach(key => {
        //console.log(key + ' - ' + screenConfig[key]) // key - value
        displayPositions.push(key);
    })
    return displayPositions
}

function getPositionForDisplayId(displayId) {
    let keys = []
    Object.keys(screenConfig).forEach(key => {
        if(screenConfig[key]==displayId) {
            keys.push(key);
        }
    })
    if (keys.length > 1) {
        throw "more than one position found for display Id " + displayId
    }
    if (keys.length === 1) {
        return keys[0]
    } else {
        return null
    }
}

exports.getDisplayPositionsFromConfig = getDisplayPositionsFromConfig
exports.getPositionForDisplayId = getPositionForDisplayId