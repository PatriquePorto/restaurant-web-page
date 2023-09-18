let conn = require('./db')
let path = require('path')

module.exports = {
    getMenus(){
        return new Promise((resolve, reject) => {

            conn.query(
                `SELECT * FROM tb_menus ORDER BY title`,
                (err, results) => {

                    if (err) {
                        reject(err)
                    }

                    resolve(results)        
             })
        })
    },
//INSERT ITEMS ON MENU
    save(fields, files){
     
       return new Promise((resolve, reject) => {

        fields.photo = `images/${path.parse(files.photo.filepath).base}`

         conn.query(`
            INSERT INTO tb_menus (title, description, price, photo)
            VALUES(?, ?, ?, ?)
         `, [
            fields.title,
            fields.description,
            fields.price,
          //  `images/${files.photo.name}`
            fields.photo
         ], (err, results)=>{

             if(err) {
                reject(err);
             } else {

               resolve(results)


             }

            

         })

       })

    }
}

/*
let formUpdate = document.querySelector('#modal-update form');

[...document.querySelectorAll('.btn-update')].forEach(btn => {
  btn.addEventListener('click', e => {
// console.log(e)        
  let tr = e.composedPath(el => {
    
     return (el.tagName.toUpperCase() === 'TR')

   });
    
   let data = JSON.parse(tr.dataset.row)

   for (let name in data) {
     
     switch (name) {

      case 'photo': 

      break;
      default:
      let input = formUpdate.querySelector(`[name=${name}]`)
      if (input) input.value = data[name]

     } 

   }

   $('#modal-update').modal('show')

  })

}) */
