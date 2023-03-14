

exports.index = function(req,res,next){
    // Error emerged that res.render isn't a function.
    res.render("Index",{
        title : "IndexPage"
    })
    next()
}