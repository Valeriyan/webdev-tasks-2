'use strict';

const MongoClient = require('mongodb').MongoClient;

class Multivarka {
    constructor() {
        this.fields = [];
    }
    server(url) {
        this.url = url;
        return this;
    }
    collection(collection) {
        this.collectionName = collection;
        return this;
    }
    where(field) {
        const newField = {};

        newField[field] = {};
        this.fields.push(newField);
        this.lastField = field;
        return this;
    }
    equal(query) {
        this.addSelector('$eq', query);
        return this;
    }
    lessThan(query) {
        this.addSelector('$lt', query);
        return this;
    }
    greaterThan(query) {
        this.addSelector('$gt', query);
        return this;
    }
    include(query) {
        this.addSelector('$in', query);
        return this;
    }
    not(query) {
        this.isNot = true;
        return this;
    }
    addSelector(selector, query) {
        let newSelector = {};

        newSelector[selector] = query;
        if (this.isNot) {
            newSelector = {$not: newSelector};
            this.isNot = false;
        }
        this.fields[this.fields.length - 1][this.lastField] = newSelector;
    }
    find(cb) {
        try {
            MongoClient.connect(this.url, (err, db) => {
                const collection = db.collection(this.collectionName);

                collection.find({
                    $and: this.fields
                })
                .toArray((err, res) => {
                    db.close();
                    this.wipe();
                    cb(err, res);
                });
            });
        } catch (err) {
            cb(err);
        }
    }
    wipe() {
        this.url = '';
        this.collectionName = '';
        this.fields = [];
        this.lastField = '';
    }
}

module.exports = new Multivarka();
