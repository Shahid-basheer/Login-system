var express = require("express");
var router = express.Router();

const credential = {
    email:"admin@gmail.com",
    password:"123"
};
// login router
router.post("/login",(req,res)=>{
if(req.body.email == credential.email && req.body.password == credential.password){
    req.session.user = req.body.email;
    res.redirect("/route/dashboard");
}else{ 
    res.send("Invalid user credentials");   
}
});

// route for dashboard
router.get("/dashboard",(req,res)=>{
    if(req.session.user){
        res.render("dashboard",{user:req.session.user});
    }else{
        res.send("Unautherize user");  
    }
});

// route for logout
router.get("/logout",(req,res)=>{
    req.session.destroy(function(err){
        if(err)
           res.send("Error occured");
        res.render("base",{titile:"Express",logout:"Logout successfully!!"});   
    });
});


module.exports = router;