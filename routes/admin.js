let express = require("express")
let users = require("./../inc/users")
let admin = require("./../inc/admin")
let menus = require("./../inc/menus")
let router = express.Router()

router.use(function(req, res, next) {

     if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
        
       res.redirect("/admin/login")

   } else { 

        next()

    }

})
// Render admin menu
router.use(function(req, res, next) {
   
   req.menus = admin.getMenus(req)

   next()

})
/*DELETE USER SESSION LOGOUT*/
router.get("/logout", function(req, res, next) {

   delete req.session.user

   res.redirect("/admin/login")

})
/*Home redirect*/ 
router.get("/", function(req, res, next){

   admin.dashboard().then(data => {

      res.render("admin/index", admin.getPamars(req, { 

         data

      }))
     
   }).catch(err => {
      console.error(err);
   })

})

/*LOGIN ADMIN PAGE */
router.post("/login", function(req, res, next){

   if (!req.body.email) {

        users.render(req, res, "Preencha o campo e-mail!")

   } else if (!req.body.password) {

       users.render(req, res, "Preencha o campo senha!")

   } else {
    
     users.login(req.body.email, req.body.password).then(user => {

      req.session.user = user
      
      res.redirect("/admin")
     }).catch(err => {

          users.render(req, res, err.message || err)

     })

   }
 
})

router.get("/login", function(req, res, next){

   // if (!req.session.views) req.session.views = 0

   // console.log("SESSION:", req.session.view++)

    users.render(req, res, null)

 })

 router.get("/contacts", function(req, res, next){

    res.render("admin/contacts", admin.getPamars(req))

 })

 router.get("/emails", function(req, res, next){

    res.render("admin/emails", admin.getPamars(req))

 })

 router.get("/menus", function(req, res, next){

   menus.getMenus().then(data => {
    
      res.render("admin/menus", admin.getPamars(req, {
         data
      }))

   })

 })

 router.post("/menus", function(req, res, next){

   menus.save(req.fields, req.files).then(results=>{

        res.send(results)

   }).catch(err=>{

       res.send(err)

   })

})

 router.get("/reservations", function(req, res, next){

    res.render("admin/reservations", admin.getPamars(req, {
      date: {}
    }))
 })

 router.get("/users", function(req, res, next){

    res.render("admin/users", admin.getPamars(req))

 })


module.exports = router