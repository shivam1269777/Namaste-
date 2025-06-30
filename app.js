if(process.env.NODE_ENV!='Production')
{require("dotenv").config();}
const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const ExpressErr=require("./utility/ExpressError.js");
const list=require("./routes/list.js");
const review=require("./routes/review.js");
const user=require("./routes/user.js");
const booking=require("./routes/booking.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
app.engine('ejs', engine);
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
main().then((res)=>{console.log(res)}).catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.Atlasdb);} 
const store= MongoStore.create({
   mongoUrl:process.env.Atlasdb,
   crypto:{
    secret:process.env.secret,
   },
   touchAfter:24*3600,
});

store.on("error",()=>{
  console.log("Error in mongodb session store",err);
});

  let sessionOption={
    store:store,
  secret:process.env.secret,
  resave:false,
  saveUninitialized :true, 
  cookie:{
    expires:Date.now() +7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
};


app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser=req.user;
  next();
})
app.use("/lists",list);
app.use("/lists/:id/reviews",review);
app.use("/",user);
app.use(booking);

app.all('/{*any}',(req,res,next)=>{
next(new ExpressErr(404,"page not found"));
});
app.use(( err,req, res, next) => {
  let{status=500,message='something went worng'}=err;
  res.status(status).render("./list/error.ejs",{message})
});

app.listen(4042,()=>{console.log("working")});