const mysql = require('mysql2'); // import mysql2 package

// config
const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'apiDB'
}

// database connection
const localDB = mysql.createPool(config);

// check connection
localDB.getConnection((err)=> {
    if(err){
        console.log('Database connection has not been established!');
    }else{
        console.log('Database connectioin is successfully established!');
    }
})