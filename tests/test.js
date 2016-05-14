'use strict';

const expect = require('chai').expect;
const multivarka = require('../multivarka.js');

const removeId = (data) => {
    data.forEach((object) => {
        delete object._id;
    });
};

describe('Tests for multivarka', () => {
    it('Should return right array after equal', (done) => {
        multivarka.server('mongodb://localhost:27017/test')
            .collection('students')
            .where('grade')
            .equal(5)
            .find((err, data) => {
                removeId(data);
                expect(data).to.deep.equal(
                [
                    {
                        name: 'Вася',
                        group: 'ПИ-301',
                        grade: 5
                    }
                ]);
                done();
            });
    });

    it('Should return right array after lessThan', (done) => {
        multivarka.server('mongodb://localhost:27017/test')
            .collection('students')
            .where('grade')
            .lessThan(3)
            .find((err, data) => {
                removeId(data);
                expect(data).to.deep.equal(
                [
                    {
                        name: 'Витя',
                        group: 'КБ-301',
                        grade: 2
                    }
                ]);
                done();
            });
    });

    it('Should return right array after greaterThan', (done) => {
        multivarka.server('mongodb://localhost:27017/test')
            .collection('students')
            .where('grade')
            .greaterThan(4)
            .find((err, data) => {
                removeId(data);
                expect(data).to.deep.equal(
                [
                    {
                        name: 'Вася',
                        group: 'ПИ-301',
                        grade: 5
                    }
                ]);
                done();
            });
    });

    it('Should return right array after include', (done) => {
        multivarka.server('mongodb://localhost:27017/test')
            .collection('students')
            .where('group')
            .include(['МТ-301', 'КБ-301'])
            .find((err, data) => {
                removeId(data);
                expect(data).to.have.lengthOf(2);
                expect(data).to.include(
                    {
                        name: 'Витя',
                        group: 'КБ-301',
                        grade: 2
                    }
                );
                expect(data).to.include(
                    {
                        name: 'Артём',
                        group: 'МТ-301',
                        grade: 4
                    }
                );
                done();
            });
    });

    it('Should return right array after not equal', (done) => {
        multivarka.server('mongodb://localhost:27017/test')
            .collection('students')
            .where('group')
            .not()
            .equal('ПИ-301')
            .find((err, data) => {
                removeId(data);
                expect(data).to.have.lengthOf(4);
                expect(data).to.include(
                    {
                        name: 'Витя',
                        group: 'КБ-301',
                        grade: 2
                    }
                );
                expect(data).to.include(
                    {
                        name: 'Артём',
                        group: 'МТ-301',
                        grade: 4
                    }
                );
                expect(data).to.include(
                    {
                        name: 'Маша',
                        group: 'ПИ-302',
                        grade: 3
                    }
                );
                expect(data).to.include(
                    {
                        name: 'Миша',
                        group: 'ПИ-302',
                        grade: 3
                    }
                );
                done();
            });
    });

    it('Should return right array after two where()', (done) => {
        multivarka.server('mongodb://localhost:27017/test')
            .collection('students')
            .where('group')
            .include(['МТ-301', 'КБ-301'])
            .where('grade')
            .not()
            .equal(2)
            .find((err, data) => {
                removeId(data);
                expect(data).to.deep.equal(
                    [
                        {
                            name: 'Артём',
                            group: 'МТ-301',
                            grade: 4
                        }
                    ]);
                done();
            });
    });
});
