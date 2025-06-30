const { required } = require("joi");
const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const bookingSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"List",
        required:true,
    },
    checkIn: Date,
  checkOut: Date,
  guests: Number,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports=mongoose.model("Booking",bookingSchema);