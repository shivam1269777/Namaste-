const List=require("../models/listing.js");
const Review=require("../models/review.js");
module.exports.Postreview=async(req,res)=>{
  let {id}=req.params;
let list=await List.findById(id);
let newReview=new Review(req.body.review);
newReview.author=req.user._id;
list.reviews.push(newReview);
await newReview.save();
await list.save();
req.flash("success","REVIEW IS SUCCESSFULLY CREATED");
res.redirect(`/lists/${list._id}`);
}

module.exports.deletReview=async (req,res)=>{
let {id,reviewId}=req.params;
await List.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
 await Review.findByIdAndDelete(reviewId);
 req.flash("success","REVIEW IS SUCCESSFULLY DELETED");
 res.redirect(`/lists/${id}`);
}