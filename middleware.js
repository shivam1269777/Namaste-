const List=require("./models/listing.js");
const Review=require("./models/review.js");
module.exports.isLoggedIn=  (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","Firstly you should login");
        return res.redirect("/Login");
    }
    next();
};

module.exports.SetnewUrl=(req,res,next)=>{
if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
}
next();
};

module.exports.isOwner=async(req,res,next)=>{
let {id}=req.params;
    let list= await List.findById(id);
  if(!res.locals.currUser._id.equals(list.owner._id)){
req.flash("error","You are not the owner of this itme");
return  res.redirect(`/lists/${id}`);
  }
  next();
};

module.exports.isAuthor=async(req,res,next)=>{
let {id,reviewId}=req.params;
    let review= await Review.findById(reviewId);
  if(!res.locals.currUser._id.equals(review.author._id)){
req.flash("error","You are not the owner of this review");
return  res.redirect(`/lists/${id}`);
  }
  next();
};