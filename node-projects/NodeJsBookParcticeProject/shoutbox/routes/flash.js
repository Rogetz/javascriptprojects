

module.exports = function flashTest(req,res,next){
    // the flash is in the req object
    // I have set this  flash message outside this touter so that I can see if the test gets lost after refresh
    req.flash("Test","This is my message")
    //res.locals.message = req.flash()// It worked
    console.log("flash message text passed") 
    res.render('flash')   
}