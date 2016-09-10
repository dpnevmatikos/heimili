import Sequelize = require('sequelize');
import Models = require('./models');
var config = require('./config.json');

let sequelize = new Sequelize(
        config.database.name,
        config.database.username,
        config.database.password, {
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

export let PersonDao = sequelize.define<Models.Person, Models.Person>(
    'person', {
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
    }}, {
        freezeTableName: true
});

export async function initDb() {
    try {
        console.log('* Starting Model-Db syncing...');
        let sync = await PersonDao.sync({ force: true });
    } catch(e) {
        console.log(e);
    }
    console.log('** Finished Syncing');
    
    let p = new Models.Person();
    p.firstName = 'jim';
    p.lastName = 'dog';
    
    try {
        console.log('* Adding Test entity...');
        var cUser = await PersonDao.create(p);
        console.log('---> Person saved ..');
        var uu = await PersonDao.findOne();
        console.log('Found user ' + uu.firstName + ' ' + uu.lastName);
    } catch(e) {
        console.log(e);
    }
}
