"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const Sequelize = require('sequelize');
const Models = require('./models');
var config = require('./config.json');
let sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    dialect: config.database.dialect,
    host: config.database.host,
    port: 1433,
    pool: {
        maxConnections: 5,
        minConnections: 0,
        maxIdleTime: 1000
    },
    dialectOptions: {
        encrypt: true
    }
});
exports.PersonDao = sequelize.define('person', {
    firstName: {
        type: Sequelize.STRING,
        field: 'Firstname'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'Lastname'
    },
    age: {
        type: Sequelize.INTEGER,
        field: 'Age'
    } }, {
    freezeTableName: true
});
function initDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('---> Starting DB..');
            let sync = yield exports.PersonDao.sync({ force: true });
        }
        catch (e) {
            console.log(e);
        }
        console.log('---> Finished sync..');
        debugger;
        let p = new Models.Person();
        p.firstName = 'jim';
        p.lastName = 'dog';
        debugger;
        try {
            console.log('---> Adding person..');
            var cUser = yield exports.PersonDao.create(p);
            console.log('---> Person saved ..');
            var uu = yield exports.PersonDao.findOne();
            console.log('Found user ' + uu.firstName + ' ' + uu.lastName);
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.initDb = initDb;
//initDb();
