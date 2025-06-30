const express=require("express");
const route=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const User=require("../models/user.js");
const passport=require("passport");
const {SetnewUrl}=require("../middleware.js");
const Usercontrol=require("../controller/user.js")
route.get("/signup",Usercontrol.getSignupPage);

route.post("/signup",wrapAsync(Usercontrol.postSignupPage));

route.get("/Login",Usercontrol.getLogin);

route.post("/Login", SetnewUrl, passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true}),
Usercontrol.postLogin
);

route.get("/Logout",Usercontrol.getLogout);
module.exports=route;