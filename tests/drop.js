'use strict';

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
    const collection = db.collection('students');
    collection.drop();
    db.close();
});
