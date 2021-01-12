const faker = require('faker')
const fs = require('fs')
const crypto = require('crypto')

function getSmallObject() {
    return {
        siteId: faker.random.number({min: 1, max: 50000}),
        date: faker.date.between('2019-01-01', '2019-12-31'),
        machineId: faker.random.number({min: 1, max: 200000}),
        driverId: faker.random.number({min: 1, max: 50000}),
        address: {
            country: faker.address.country(),
            city: faker.address.city(),
            street: faker.address.streetName(),
            number: faker.random.number({min: 1, max: 200})
        },
        additionalInfo1: faker.lorem.sentences(3,3),
        additionalInfo2: faker.lorem.sentence()
       }
}
module.exports.getSmallObject = getSmallObject;

const smallObjectList = new Array(40).fill(null)
.map(e => getSmallObject())

function getBigObject(date) {
    return {
        siteId: faker.random.number({min: 1, max: 50000}),
        date: date,
        machineId: faker.random.number({min: 1, max: 200000}),
        driverId: faker.random.number({min: 1, max: 50000}),
        address: {
            country: faker.address.country(),
            city: faker.address.city(),
            street: faker.address.streetName(),
            number: faker.random.number({min: 1, max: 200})
        },
        additionalInfo1: faker.lorem.sentences(3,3),
        additionalInfo2: faker.lorem.sentence(),
        smallObjectList: smallObjectList
       }
}

module.exports.getBigObject = getBigObject;

const fleetIds = new Array(1000).fill(null)
.map(e => get32Hex())

const vehicleIds = new Array(300000).fill(null)
.map(e => get32Hex())

var templateFile = "ex.json"
var json = null

function get32Hex(){
    return crypto.randomBytes(16).toString('hex').toUpperCase();
}

function getUsingTemplate(date){
    if (json === null) {
        let file = fs.readFileSync(templateFile)
        json = JSON.parse(file)
    }
    let object = Object.assign({}, json)
    object._id = null
    object.platformVehicleIdentifier = vehicleIds[faker.random.number({min: 0, max: 299999})]
    let fleetID = new Array(faker.random.number({min: 1, max: 2})).fill(null)
        .map(e => fleetIds[faker.random.number({min: 0, max: 999})])
    object.platformFleetOrganizationIdentifiers = fleetID
    object.labels = fleetID
    object.trackingTime = date.getTime()
    object.triggerTime = date.getTime()
    object.triggerDate = date
    return object
}
module.exports.getUsingTemplate = getUsingTemplate;

