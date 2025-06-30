const List=require("../models/listing.js");
const NodeGeocoder = require('node-geocoder');
const options = { provider: 'openstreetmap' }; // Free and no API key needed
const geocoder = NodeGeocoder(options);
module.exports.index=async (req ,res)=>{
  let data= await List.find({});
  res.render("./list/index.ejs",{data});
}

module.exports.newItem=(req,res)=>{
  res.render("./list/new.ejs");
};

module.exports.newItemPost=async (req,res)=>{
  let url=req.file.path;
  let filename=req.file.filename;
let list=  new List(req.body.list);
const address = req.body.list.location;
const geoData = await geocoder.geocode(address).catch(err => null);
list.owner=req.user._id;
list.image={url,filename};
if (geoData && geoData.length > 0){list.geometry={type:"Point", coordinates:[geoData[0].longitude,geoData[0].latitude],};}
else {
    // ensure geometry is still defined to avoid validation error
    list.geometry = {
      type: "Point",
      coordinates: [0, 0] // fallback coordinates if geocoding fails
    };
  }
let saveList=await list.save();
console.log(saveList);
req.flash("success","New item is added Now");
res.redirect("/lists");
};

module.exports.detailsofItem=async(req,res)=>{
  let {id}=req.params;
  let datad= await List.findById(id).populate({
  path: "reviews",
  populate: {
    path: "author"
  }
})
.populate("owner");
  if(!datad){
    req.flash("error","ITEM FOR WHICH YOU ARE REQUESTED DOES NOT EXIST NOW");
    return res.redirect("/lists");
  }
  res.render("./list/details.ejs",{datad});
};

module.exports.editDetails=async (req,res)=>{
let {id}=req.params;
let data= await List.findById(id);
if(!data){
  req.flash("error","THE ITEM WHICH YOU TRY TO EDIT IS NOT EXIST");
 return  res.redirect("/lists");
}
res.render("./list/edit.ejs",{data});
};

module.exports.editDetailsPut=async (req,res)=>{
  let {id}=req.params;
  let list=await List.findByIdAndUpdate(id,{...req.body.list});
if(typeof req.file!=="undefined")
  {let url=req.file.path;
  let filename=req.file.filename;
list.image={url,filename};
await list.save();}
  req.flash("success","IT EM IS SUCCESSFULLY UPDATED");
  res.redirect(`/lists/${id}`);
}

module.exports.deleteItem=async (req,res)=>{
  let {id}=req.params;
 let del= await List.findByIdAndDelete(id);
 req.flash("success","ITEM IS SUCCESSFULLY DELETED");
res.redirect("/lists");
};