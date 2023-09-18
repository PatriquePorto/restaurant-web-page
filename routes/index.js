let conn = require('./../inc/db')
let express = require('express');
let menus = require('./../inc/menus');
let reservation = require('./../inc/reservation')
let contact = require('./../inc/contact')
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results => {

    res.render('index', { 
      title: 'Restaurante Saboroso!', 
      menus: results,
      isHome: true
    });

  })

});
/*Page Routes */

router.get('/contact', function(req, res, next) {

  contact.render(req, res)
  
})

router.post('/contact', function (req, res, next) {

  console.log(req.body)

    if (!req.body.name) {
      contact.render(req, res, 'Digite seu nome!')
    } else if (!req.body.email) {
      contact.render(req, res, 'Digite seu e-mail!')
    } else if (!req.body.message) {
      contact.render(req, res, 'Digite sua mensagem!')
    } else {

     contact.save(req.body).then(results => {

      req.body = {}
        
       contact.render(req, res, null, "Contato enviado com sucesso!" )

     }).catch(err => {

        contact.render(req, res, err,message)

     })

    }
  
})

router.get('/menus', function(req, res, next) {

  menus.getMenus().then(results => {

    res.render('menus', {
      title: 'Menus - Restaurante Saboroso!', 
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    })

  })
  
})

router.get('/reservation', function(req, res, next) {

  reservation.render(req, res)

})

router.post('/reservation', function(req, res, next) {

  /*Form data */

 if (!req.body.name) {
  reservation.render(req, res, "Digite seu nome!")
 } else if (!req.body.email) {
  reservation.render(req, res, "Digite seu e-mail!")
} else if (!req.body.people) {
  reservation.render(req, res, "Selecione o número de pessoas!")
} else if (!req.body.date) {
  reservation.render(req, res, "Selecione uma data!")
} else if (!req.body.time) {
  reservation.render(req, res, "Selecione um horário!")
 } else {

    reservation.save(req.body).then(results => {

        req.body = {}
         
        reservation.render(req, res, null, "Reserva realizada com sucesso, estamos te aguardando!")

    }).catch(err => {

      reservation.render(req, res, err.massage)

    })

  }
  
})

router.get('/services', function(req, res, next) {

  res.render('services', {
    title: 'Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder servir!' 
  })
  
})

module.exports = router
