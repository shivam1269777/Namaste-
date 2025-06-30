const mongoose=require("mongoose");
const data = require("./init.js");
const List=require("../models/listing.js");
main().then(()=>{console.log("now connection is establish")}).catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotel');}
let initdb =async ()=>{
    await List.deleteMany({});
    data.data=data.data.map((obj)=>({...obj,owner:"6859a2a7a545d164e7219dcd"}))
    await List.insertMany(data.data);
    console.log( "now data is inserted");
}

initdb();