const pmysql = require('promise-mysql');

pmysql.createPool({
    connectionLimit: 3,
    host: "localhost",
    user: "root",
    password: "",
    database: "studentdb4"
})
    .then(p => {
        pool = p;
    })
    .catch(e => {
        console.log("pool error: " + e)
    })

module.exports = {
    getDepartment: function () {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM student_table')
                .then((data) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

