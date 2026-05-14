const mysql = require("mysql2");
const connection = mysql.createConnection({
    // host: 'localhost',
    socketPath: '/opt/lampp/var/mysql/mysql.sock',
    user: 'root',
    password: '',
    database: 'parcial_prog3'
});

connection.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Conectado a la base de datos");
})

module.exports = connection;
