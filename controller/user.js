const User=require("../models/user.js");

module.exports.getSignupPage=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.postSignupPage=async(req,res,next)=>{
  try{let {email_id,username,password}=req.body;
    let newUser=  new User({email_id,username});
let registeredUser=await User.register(newUser,password);
req.login(registeredUser,(err)=>{
    if(err){
        next(err);
    }
    req.flash("success","Now you are registered");
res.redirect("/lists");
})
} catch(e){
        if (e.code === 11000 && e.keyPattern && e.keyPattern.email_id) {
      req.flash("error","This email is already registered.");}
else{ req.flash("error",e.message);}   
res.redirect("/signup");
}
};

module.exports.getLogin=(req,res)=>{
    res.render("user/login.ejs")
};

module.exports.postLogin=(req,res)=>
{req.flash("success","Welcome");
    let redirectUrl=res.locals.redirectUrl || "/lists";
    res.redirect(redirectUrl);
};

module.exports.getLogout=(req,res,next)=>{
    req.logout((err)=>{
if(err){
    return next(err);
}
req.flash("success","You are logged out");
res.redirect("/lists");
    });
};