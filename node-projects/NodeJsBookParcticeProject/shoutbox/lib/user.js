// This is a working draft function, before using it ensure you delete the draft functions.

const mongoose = require("mongoose")
const bcrypt = require("bcrypt") 


mongoose.connect("mongodb://127.0.0.1:27017/ShoutBox")

let numberSchema = new mongoose.Schema({
    numberOfIds : Number
})
let userSchema = new mongoose.Schema({
    userId : Number,
    name : String,
    pass : String,
    salt : String
})
let userModel = mongoose.model("UserUpdated",userSchema)
// get used to0 naming functions e.g function() modelSearcher
// also note since this has a default export, this method has been exported as an attribute of the user model
user.userModelSearcher =  async function modelSearcher(username,fn){
    let documentsReturned = await userModel.find({name : username})
    fn(documentsReturned)    
}

let numberModel =  mongoose.model("IdCountCollection",numberSchema)
// am trying to save this documnet once so that all I'll be doin in the subsequent method is simple updates.

// the model's deleteMethod must be awaited in an async function. 
/*async function deleteNumber(){
    //to delete this part
    let deleteResponse = await numberModel.deleteMany({numberOfIds: {
        "$gt" : 0
    }});
    console.log(deleteResponse.deletedCount)
}
deleteNumber()*/


// actualy seems like most of the mongoose model functions need to be awaited first before their values can be returned.
// the delete function works, however you just have to await it first for it to work.
// commented out since I'll be testing for duplicates
/*async function deleteUser(){
    let deleteResponse = await userModel.deleteMany({});// deletes all documents
    console.log(deleteResponse.deletedCount)    
}
deleteUser()*/

// for testing whether the number collection has a record before saving anything.
async function numberFindResponse(){
    let foundResponse = await numberModel.find()
    if(foundResponse.length <= 0){
        let NumberDocument = new numberModel({numberOfIds: 0})
        NumberDocument.save()
        console.log("first record save successfuly")
        // test for how many records are added each time.
    }
    else{
        let results = await numberModel.find()
        console.log("number of id documents are:"+results.length)
    }
}
numberFindResponse()// for saving the first number document.


module.exports = user;

function user(user){
    for(var key in user){
        this[key] = user[key]
    }
}

// call it in thae save method remember it returns an approval message
user.prototype.duplicateTest = function(fn){
    let user =  this
    
    user.collectionSearcher(function(error,collectionDocuments){
        if(error){
            console.log(error)
            fn(error)
        }
        else{
            //This method was failed by the mongoose find filter with parameters so I use the old method.
            if(collectionDocuments.length == 0){
                let approvalMessage = "safe"
                fn(null,approvalMessage)
            }
            else{
                let error = "\nname duplicated"
                console.log(error)
                fn(error,null)
            }

            // This is my own validation comparison. above I've used the mongodb filter
            // also realized that a forEach her is a bad idea it reiterates errors and finallyy executes to yes when it finds the one non duplicate
            /*collectionDocuments.forEach(function(document,index){
                if(user.name == document.name){
                    let error = "name duplicated"
                    fn(error,null)
                }
                else{
                    let approvalMessage = "safe"
                    fn(null,approvalMessage)
                }
            })*/
        }
    })

}

user.prototype.collectionSearcher = async function(fn){
    let user = this
    console.log(user.name)
    // seems like the mongoose find method doesnt work well with filters, use my old method instead
    let documentsFound = await userModel.find({name : user.name})
    //let documentsFound = await userModel.find()
    fn(null,documentsFound)
}
// made this asynchronous for the sake of mongodb database.
// also allows for callbacks.
user.prototype.save = async function(fn){
    // note that I would have simply passed this fn through to all the functions, however the user properties have to be set by the internal callbacks which are not set by the caller, if it were not so I'd have passed the fn down the ladder for the sake of error handling, but still my internal callbacks have been properly set to call the fn incase of any error
    let user = this

    user.duplicateTest(function(error,message){
        if(error){
            fn(error,null)
        }
        else{
            //used a callback here to ensure that the usermodel was well assigned.    
            // finally worked I had to pass the user.pass directly to the callback for it to be set.
            // One thing am realizing is that the properties set by another method of a class are not directly inherited by the other methods so simply pass the results over to the final method for it to set them itself. mostly this issue is caused by the asynchronous nature of javascript
            user.hashpassword(async function(error,passwordGenerated){
                if(error){// the fn here can be used for handling errors, for data let it be the at the final function with the actual results required by the actual callback that was initially used.
                    fn(error,null)
                }
                else{
                    // while using the callbacks you dont have to await a function, since javascript in itself is asynchronous.
                    user.generateId(function(error,id){
                        let newUser = new userModel({userId : id,name: user.name,pass: passwordGenerated, salt: user.salt})
                        console.log("users password is :"+passwordGenerated)
                        console.log(id)
                        newUser.save()
                        fn(null,user.name)// pass the final results to the callback     
                    })// sets the id property for the user directly after being set.
                }
            })
            
        }
    })
}

user.prototype.hashpassword = async function(fn){
    let user = this
    let salt = await bcrypt.genSalt(12)
    user.salt = salt
    bcrypt.hash(user.pass,salt,function(error,hash){
        if(error){
            console.log("error found during hashing, I have kept an error handler now")
            fn(error,null)
        }
        else{
            user.pass = hash
            console.log(user.pass)
            // ensure you stick to the order. and not call an error when its actually not an error.
            fn(null,user.pass)               
        }
    })

}
user.prototype.generateId = async function(fn){
    let user = this
    // the logic needs to store number of records in a database.
    // Funny that the mongoose.Schema is actually called in upper caps.
    // Cool thing about mongoose is that you can actually just pass an increment initial to the update fucntion for it to increment by itself
    let mongoUpdateResponse = await numberModel.updateMany({},{$inc : {
        numberOfIds : 1
    }})
    // no need for a filter  here cause am simply selecting everything here.
    // here I'll test for the number of modified documents cause I want it to be one each time.
    //console.log(mongoUpdateResponse.modifiedCount)
    

    // add the id here,derived from the total number of IDs.
    // note that here i'VE SIMPLY filtered out the field and not the value of teh field, its of no concern
    let returnedObject = await numberModel.findOne()
    //console.log(returnedObject.numberOfIds)
    //console.log(user.id)
    fn(null,returnedObject.numberOfIds) // return so that I can view it
}
let myUser = new user({name:"Paul",pass:"test85"})
myUser.save(function(error,name){
    if(error){
        console.log("error observed and caught sucessfuly")
    }
    else{
        console.log(name+" has been registered successfully")
    }
})

// user authentication, designed in a way to work with any type of middleware.
// must accept three parameters, the username, password and callback
// also note that this authentication method 
// also note that I didn't use a prototype here I caled it as an attribute

// try see if I can access it by only imrorting the overall user class.


// passwordParser
// so I had to import this separately since it doesn't associate itself with the user class
// also kumbe I can still export even if the module.exports has been used somewhere






// This below was a test.
/*function User(user){
    // note that this object itself recognizes its methods as keys.
    // therefore whatever you add here is combined with its methods as keys.
    for (var key in user){
        this[key] = user[key]
    }
}

User.prototype.printOut = function(){
    // since even the methods of a class are considered keys, don't loop over all the keys to get the values, instead simply use the direct call to objects such as this.name
    // safest method of accessing the variables.
    // funny enough the bool is also using the same method.
    console.log(this.name)
    console.log(this.class)
}

let myUser = new User({name:"Ronny",class: "form three"})

myUser.printOut()*/