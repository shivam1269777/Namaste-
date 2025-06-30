const express=require("express");
const route=express.Router({mergeParams:true});
const wrapAsync=require("../utility/wrapAsync.js");
 const{reviewSchema}=require("../schema.js");
const List=require("../models/listing.js");
const ExpressErr=require("../utility/ExpressError.js");
const Review=require("../models/review.js");
const Reviewcontrol=require("../controller/review.js")
const { isLoggedIn, isAuthor } = require("../middleware.js");

const validatereview=(req,res,next)=>{
  let {error}=reviewSchema.validate(req.body);
  if(error){
    let errmsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressErr(400,errmsg);
  }else{next();}
};
route.post("/",isLoggedIn,validatereview,wrapAsync(Reviewcontrol.Postreview));

route.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(Reviewcontrol.deletReview));


module.exports=route;