const mongoProvider = require('./mongoProvider');
const trajectoryLogger = require('./trajectoryLogger');
const getSmallObject = require('./objectProvider').getSmallObject;
const getBigObject = require('./objectProvider').getBigObject;
const _ = require('lodash');

const batchSize = 10000;
async function generateCollection(size, collectionName, objGenerator, withTrajectoryLog) {
    let i = 0;
    logfilename = collectionName + '_' + (new Date()).getTime();
    while (i < size) {
        let start = new Date()
        let objs = _.map(new Array(batchSize), objGenerator);
        console.log('Generation took: ' + (new Date() - start));
        let mongoStart = new Date();
        let res = await mongoProvider.insertMany(objs, collectionName);
        let timeElapsed = new Date() - mongoStart;
        i = i + batchSize;
        console.log('Batch for collection ' + collectionName + ' of: ' + size + ' at: ' + i + ', inserts completed in:' + timeElapsed + ' ms')
        if(withTrajectoryLog) {
            let trajectory = {timestamp: (new Date()).toISOString(), batchSize: batchSize, recordCount: i, timeElapsed: timeElapsed};
            // optional! comment out if it might interfere with your test, for example if you have a small batch size
            await mongoProvider.insert(trajectory, logfilename)  
            trajectoryLogger.saveToFile(logfilename, trajectory);
        }
    }
}
module.exports.generateCollection = generateCollection;


module.exports.generateStandardCollectionsForSmallObj = async function() {
    var indexSet1 =         [
        {name: 'ind1', key: {driverId: 1}}, 
        {name: 'ind2', key: {date: 1, siteId: 1}}
    ];
    
    var indexSet2 =         [
        {name: 'ind1', key: {driverId: 1}}, 
        {name: 'ind2', key: {machineId: 1, siteId: 1}},
        {name: 'ind3', key: {machineId: 1, "address.city": 1}},
        {name: 'ind4', key: {"address.country": 1, siteId: 1}}

    ];
    
    await generateCollection(1000000, 'smallObj1million1index', getSmallObject, true);
    // await mongoProvider.createIndexes(indexSet1, 'smallObj1million3indexes');
    // await generateCollection(1000000, 'smallObj1million3indexes', getSmallObject, true);
    // await mongoProvider.createIndexes(indexSet2, 'smallObj1million5indexes');
    // await generateCollection(1000000, 'smallObj1million5indexes', getSmallObject, true);

    // await generateCollection(10000000, 'smallObj10million1index', getSmallObject, true);
    // await mongoProvider.createIndexes(indexSet1, 'smallObj10million3indexes');
    // await generateCollection(10000000, 'smallObj10million3indexes', getSmallObject, true);
    // await mongoProvider.createIndexes(indexSet2, 'smallObj10million5indexes');
    // await generateCollection(10000000, 'smallObj10million5indexes', getSmallObject, true);

    // await generateCollection(50000000, 'smallObj50million1index', getSmallObject, true);
    // await mongoProvider.createIndexes(indexSet1, 'smallObj50million3indexes');
    // await generateCollection(50000000, 'smallObj50million3indexes', getSmallObject, true);
    
    // await mongoProvider.createIndexes(indexSet2, 'smallObj50million5indexes');
    // await generateCollection(50000000, 'smallObj50million5indexes', getSmallObject, true);
    
    // await generateCollection(150000000, 'smallObj150million1index', getSmallObject, true);
    // await mongoProvider.createIndexes(indexSet1, 'smallObj150million3indexes');
    // await generateCollection(150000000, 'smallObj150million3indexes', getSmallObject, true);
    // await mongoProvider.createIndexes(indexSet2, 'smallObj150million5indexes');
    // await generateCollection(150000000, 'smallObj150million5indexes', getSmallObject, true);
    
}


module.exports.generateStandardCollectionsForBigObj = async function() {
    var indexSet1 =         [
        {name: 'ind1', key: {driverId: 1}}, 
        {name: 'ind2', key: {date: 1, siteId: 1}}
    ];
    // var indexSet2 =         [
    //     {name: 'ind1', key: {driverId: 1}}, 
    //     {name: 'ind2', key: {date: 1, siteId: 1}},
    //     {name: 'ind3', key: {machineId: 1, date: 1}},
    //     {name: 'ind4', key: {"address.country": 1, date: 1}}

    // ];
    var indexSet2 =         [
        {name: 'ind1', key: {driverId: 1}}, 
        {name: 'ind2', key: {machineId: 1, siteId: 1}},
        {name: 'ind3', key: {machineId: 1, "address.city": 1}},
        {name: 'ind4', key: {"address.country": 1, siteId: 1}}

    ];

    //await generateCollection(1000000, 'bigObj1million1index', getBigObject, true);
    //await mongoProvider.createIndexes(indexSet1, 'bigObj1million3indexes');
    //await generateCollection(1000000, 'bigObj1million3indexes', getBigObject, true);
    //await mongoProvider.createIndexes(indexSet2, 'bigObj1million5indexes');
    //await generateCollection(1000000, 'bigObj1million5indexes', getBigObject, true);

    //await generateCollection(10000000, 'bigObj10million1index', getBigObject, true);
    //await mongoProvider.createIndexes(indexSet1, 'bigObj10million3indexes');
    //await generateCollection(10000000, 'bigObj10million3indexes', getBigObject, true);
    //await mongoProvider.createIndexes(indexSet2, 'bigObj10million5indexes');
    //await generateCollection(10000000, 'bigObj10million5indexes', getBigObject, true);

    //await generateCollection(50000000, 'bigObj50million1index', getBigObject, true);
    //await mongoProvider.createIndexes(indexSet1, 'bigObj50million3indexes');
    //await generateCollection(50000000, 'bigObj50million3indexes', getBigObject, true);
    
    //await mongoProvider.createIndexes(indexSet2, 'bigObj50million5indexes');
    //await generateCollection(50000000, 'bigObj50million5indexes', getBigObject, true);

    await mongoProvider.drop('bigObj100k5indexes');
    await mongoProvider.createIndexes(indexSet2, 'bigObj100k5indexes');
    await generateCollection(100000, 'bigObj100k5indexes', getBigObject, true);

}
