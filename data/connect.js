const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'VTI_1',
    password: '1234',
    port: 5432,
});

// const sequelize = new Sequelize('VTI_1', 'postgres', '1234', {
//     host: 'localhost',
//     dialect: 'postgres'
// })
module.exports = pool;