let conn = require("./db")

module.exports = {
    
    render(req, res, error, success){

        res.render('reservation', {
            title: 'Reservas - Restaurante Saboroso!', 
            background: 'images/img_bg_2.jpg',
            h1: 'Reserve uma Mesa!',
            body: req.body,
            error,
            success
    })
   },

   /*Save form data in db*/
   save(fields){

    return new Promise((resolve, reject)=>{

        /*Fix time bug in Mysql database*/
        let date = fields.date.split('/')

        fields.date = `${date[2]}-${date[1]}-${date[0]}`

        conn.query(
            `INSERT INTO tb_reservation (name, email, people, date, time)
             VALUES(?, ?, ?, ?, ?)`
             , [
                fields.name, 
                fields.email, 
                fields.people, 
                fields.date,
                fields.time
               ], (err, results) => {  
                 

                 if (err) {
                    reject(err)
                 } else {

                    resolve(results)

                 }

              })
         })
     
     }
}