'use strict';

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/test', (err, db) => {
    const collection = db.collection('students');

    collection.insert([
        {name: 'Вася', group: 'ПИ-301', grade: 5 },
        {name: 'Миша', group: 'ПИ-302', grade: 3 },
        {name: 'Маша', group: 'ПИ-302', grade: 3 },
        {name: 'Паша', group: 'ПИ-301', grade: 4 },
        {name: 'Витя', group: 'КБ-301', grade: 2 },
        {name: 'Артём', group: 'МТ-301', grade: 4 }
        ],
        () => {
            db.close();
        }
    );
});



