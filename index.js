const mongoProvider = require('./mongoProvider');
const generate = require('./generate');
const getSmallObject = require('./objectProvider').getSmallObject;
const getBigObject = require('./objectProvider').getBigObject;

(async () => {
    var db = await mongoProvider.getDb();
    await generate.generateStandardCollectionsForBigObj();
    console.log('done'); 
    db.close();
})();
