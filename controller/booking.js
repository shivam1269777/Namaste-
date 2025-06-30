const List=require("../models/listing.js");
const Booking=require("../models/booking.js");
module.exports.bookingget=async(req,res)=>{
    const hotel=await List.findById(req.params.id);
    if(!hotel){
        req.flash("error","Somethin wnent wrong hotel is not found");
        return res.redirect("/lists");
    };
if(hotel.owner.equals(req.user._id))
{req.flash("error", "You cannot book your own hotel.");
    return res.redirect(`/lists/${hotel._id}/book`);}
    res.render("./booking/bookingform.ejs",{hotel});
 };

 module.exports.bookingpost=async(req,res)=>{
    const {checkIn,checkOut,guests}=req.body;
    const hotel= await List.findById(req.params.id);
    const booking =new Booking({
        user:req.user._id,
        hotel:hotel._id,
        checkIn:checkIn,
        checkOut:checkOut,
        guests:guests,
    });
    await booking.save();
    req.flash("success", "Hotel booked successfully!");
  res.redirect(`/lists`);
 };

 module.exports.mybookingget=async(req,res)=>{
    const bookings= await Booking.find({user:req.user._id}).populate("hotel");
    if(bookings.length===0){
        req.flash("error","You did not book anything  ");
         return res.redirect("/lists");
    }
res.render("./booking/mybooking.ejs",{bookings});
 }
 