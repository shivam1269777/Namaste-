const express=require("express");
const route=express.Router();
const wrapAsync=require("../utility/wrapAsync.js");
const{listSchema}=require("../schema.js");
const {isLoggedIn, isOwner}=require("../middleware.js");
const List=require("../models/listing.js");
const ExpressErr=require("../utility/ExpressError.js");
const Listpages=require("../controller/listing.js");
const multer  = require('multer')
const {storage}=require("../CloudConfig.js");
const upload = multer({ storage });
const validatelist=(req,res,next)=>{
  let {error}=listSchema.validate(req.body);
  if(error){
    let errmsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressErr(400,errmsg);
  }else{next();}
};

route.get("/",wrapAsync(Listpages.index));

//new route
route.get("/new",isLoggedIn,Listpages.newItem);
route.post("/",isLoggedIn,upload.single('list[image]'),validatelist,wrapAsync(Listpages.newItemPost));
//details route
route.get("/:id",wrapAsync(Listpages.detailsofItem));

//edit route
route.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(Listpages.editDetails));
//update route
route.put("/:id",isLoggedIn,isOwner,upload.single('list[image]'),validatelist,wrapAsync(Listpages.editDetailsPut));
//delete route
route.delete("/:id",isLoggedIn,isOwner,wrapAsync(Listpages.deleteItem));

module.exports=route;