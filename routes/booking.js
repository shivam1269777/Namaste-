const express=require("express");
const route=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const bookingcontrol=require("../controller/booking.js")
 route.get("/lists/:id/book",isLoggedIn,wrapAsync(bookingcontrol.bookingget));
 route.post("/lists/:id/book",isLoggedIn,wrapAsync(bookingcontrol.bookingpost));
 route.get("/mybookings",isLoggedIn,wrapAsync(bookingcontrol.mybookingget));
 module.exports=route;