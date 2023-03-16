var bcrypt = require("bcrypt")
var mongoose = require("mongoose")

// custom lib model
var importedUser = require("./user") //the user model for the sake of mongoose userModel

// passwordParser
// so I had to import this separately since it doesn't associate itself with the user class
// also kumbe I can still export even if the module.exports has been used somewhere
exports.myBasicAuth = myBasicAuth 
function myBasicAuth(req,res,next){
    if(!req.headers.authorization){
        res.set("www-Authenticate",'Basic realm="401"')
        res.status(401).send("Authentication required")
    }
    else{
        base64clientCredentials = req.headers.authorization.split(" ")[1] || " "
        if(base64clientCredentials == ""){
            res.set("www-Authenticate",'Basic realm="401"')
            res.status(401).send("Authentication required")
        }
        else{
            let convertedCredentials = Buffer.from(base64clientCredentials,"base64").toString()
            // not using the split method of strings since oasswords might contain them and that can choke the passwords
            let splitIndex = convertedCredentials.indexOf(":")
            let username = convertedCredentials.substring(0,splitIndex)
            let password = convertedCredentials.substring(splitIndex + 1)
            authenticate(username,password,function(error,validUser){
                console.log("authenticate method reached")
                /*if(error){
                    let error = new mongoose.Error("error observed")
                    next(error)
                }*/
                if(error == "Invalid password"){
                    console.log("Invalid passowrd from the user")
                    res.send("Wrong password man sorry hahaha")
                }
                else if(error == "no user found"){
                    console.log("No user found")
                    res.send("No user found over here")
                }
                else if(validUser == null){
                    console.log("Invalid user reached")
                    // flash can't be used here since this middleware has been set before the flash middleware was called.
                    //req.flash("NO user found")
                    res.send("No user found")
                }
                else if(validUser){
                    console.log("valid user reached")
                    // this is if there's data
                    //res.sendStatus(302)
                    // there was a problem with my view actually and not this piece of code
                    // never redirect while in this basic Auth middleware, simply pass it over to the next middleware handler
                    //res.redirect("/home")
                    
                    next()

                    // It can however directly render a view, its only a redirect that's a problem
                    //res.render("index",{title: "Index"})
                }
                else{
                    console.log("least method reached")
                    // any other data
                    req.flash("enter valid data please")
                    res.send("Invalid credentials please")
                }
            })
        }
    }
}

function authenticate(username,password,fn){
    // code for finding if the record exists in the database
    async function searcher(){
        
        importedUser.userModelSearcher(username,function(data){
            let documentsFound = data
        
            if(documentsFound.length < 1){
                console.log("length less than one")
                // if no record is found always return the callback with no output
                fn("no user found")
            }
            else{
                // validate the password now
                let user = documentsFound[0]
                
                // hash password and compare then do the last thing if no error occurs
                bcrypt.hash(password,user.salt,function(error,hash){
                    if(error){
                        console.log("the error at hashing")
                        fn(error)
                    }
                    else{
                        // validate finally
                        if(hash == user.pass){
                            fn(null,user)
                        }
                        else{
                            // if no password found return an empty paramter function
                            fn("Invalid password",null)
                        }
                    }
                    
                })
            }
        })
    }
    searcher()
}
