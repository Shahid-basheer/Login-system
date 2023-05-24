const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const {v4:uuidv4} = require("uuid");
const router = require("./router.js");
const app = express();

const port = process.env.PORT || 4000;
app.set("view engine",'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

// load static asset 
app.use('/static',express.static(path.join(__dirname,'public')));

app.use("/route",router);
// home route
app.get('/',(req,res)=>{
    if(req.session.user)
        res.redirect("/route/dashboard");
    else
        res.render("base",{title:"Login System"});
});



app.listen(port,()=>{console.log("Server is running on port http://localhost:4000")});
