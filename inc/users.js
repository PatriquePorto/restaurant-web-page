/*FUNCTION VALIDATE LOGIN ADMIN PAGE */

let conn = require("./db") /* <-- Db connect require */

module.exports = {

    render(req, res, error) {
    
        res.render("admin/login", {
            body: req.body,
            error
        })

    },

   login(email, password){

     return new Promise((resolve, reject) => {

       conn.query(
        `SELECT * FROM tb_users WHERE email = ?`
        , [
            email
        ], (err, results) => {

             if (err) {
                reject(err)
             } else {

                if (!results.length > 0) {
                   reject("E-mail ou senha incorretos!")
                } else {

                    let row = results[0]

                    if (row.password !== password) {
                        reject("E-mail ou senha incorretos!")
                    } else {
                        resolve(row)
                    }
                }

             }

        })

     })

   }

}