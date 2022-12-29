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
    getStudents: function () {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM student_table')
                .then((data) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    deleteStudent: function (sid) {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM student_table WHERE student_id = ${sid}`)
                .then((data) => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })

    }
}

