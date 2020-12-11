const faker = require('faker')

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

const smallObjectList = new Array(10).fill(null)
.map(e => getSmallObject())

function getBigObject() {
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
        additionalInfo2: faker.lorem.sentence(),
        smallObjectList: smallObjectList
       }
}

module.exports.getBigObject = getBigObject;