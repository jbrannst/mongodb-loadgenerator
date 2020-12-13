const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
//const url = "mongodb+srv://user:password@cluster.mongodb.net/test?retryWrites=true";
const database = 'test';

let db = null;
async function getDb() {
    if(db !== null) {
        return db;
    }
    const client = await mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        sslValidate: false
    }).catch(e => { console.log(e) });
    let newDb = client.db(database);
    if(db === null) {
        db = newDb;
    }
    let close_conn = client.close;
    newDb.close = function () {
        close_conn.apply(client, arguments);
    }

    return newDb;
}

module.exports.getDb = getDb;

module.exports.find = async function (searchData, collectionName) {
    if(db === null) {
        await getDb();
    }
    const cursor = await db.collection(collectionName).find(searchData);
    return cursor.toArray();
}

module.exports.update = async function (searchData, updateData, collectionName) {
    await db.collection(collectionName).updateOne(searchData, updateData);
}

module.exports.updateMany = async function (searchData, updateData, collectionName) {
    await db.collection(collectionName).updateMany(searchData, updateData, {
        writeConcern: 1,
        ordered: false
     });
}

module.exports.insert = async function (data, collectionName) {
    if(db === null) {
        await getDb();
    }
    const res = await db.collection(collectionName).insertOne(data);
    return res;
}

module.exports.insertMany = async function (data, collectionName) {
    if(db === null) {
        await getDb();
    }
    const res = await db.collection(collectionName).insertMany(data, {
        writeConcern: 1,
        ordered: false
     });
    return res;
}

module.exports.createIndexes = async function (indexData, collectionName) { 
    await db.collection(collectionName).createIndexes(
        indexData, 
    function(err, result){
    }
    )
};

module.exports.drop = async function (collectionName) { 
    await db.collection(collectionName).drop().catch(e => { console.log(e) });
};
