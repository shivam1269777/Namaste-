const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const User=require("./user.js");
const { required } = require("joi");
let listSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{type:String,},
    image:{ url:String,
        filename:String,
    },
    price:{type:Number,},
    location:{type:String,},
    country:{type:String,},
    reviews:[{
type:Schema.Types.ObjectId,
ref: "Review",
    }],

     owner:{
type:Schema.Types.ObjectId,
ref: "User",
    },
 
geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required:true,
    },
    coordinates: {
      type: [Number], // [lng, lat]
    required:true,
    }
  },    

});
 listSchema.post("findOneAndDelete",async(list)=>{
    if(list){
    Review.deleteMany({id:{ $in: list.reviews }});}
 })

let List=mongoose.model("List",listSchema);
module.exports=List;