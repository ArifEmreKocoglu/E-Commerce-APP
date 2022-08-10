// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-app',
//     password: '1234567890Aek.'
// });

// module.exports = connection.promise();

//*********************Squelize***********************

const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-app', 'root', '1234567890Aek.', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;