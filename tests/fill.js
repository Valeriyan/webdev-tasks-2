'use strict';

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
    const collection = db.collection('students');
    collection.drop();

    collection.insert({
        name: 'Вася',
        group: 'ПИ-301',
        grade: 5
    }, () => {
        db.close();
    });
    collection.insert({
        name: 'Маша',
        group: 'ПИ-302',
        grade: 3
    }, () => {
        db.close();
    });
    collection.insert({
        name: 'Витя',
        group: 'КБ-301',
        grade: 2
    }, () => {
        db.close();
    });
    collection.insert({
        name: 'Паша',
        group: 'ПИ-301',
        grade: 4
    }, () => {
        db.close();
    });
    collection.insert({
        name: 'Миша',
        group: 'ПИ-302',
        grade: 3
    }, () => {
        db.close();
    });
    collection.insert({
        name: 'Артём',
        group: 'МТ-301',
        grade: 4
    }, () => {
        db.close();
    });
});



