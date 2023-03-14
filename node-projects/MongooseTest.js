var mongoose = require("mongoose")// mongoose module

// connect to the database., its a method
mongoose.connect("mongodb://127.0.0.1:27017/myNewDatabase")//the database is passed as a route 
let connection = mongoose.connection; // for listening for events during the connection.

connection.on("connect",function(){
    console.log("connection made successfuly")
})
let playerSchema = new mongoose.Schema({
    name : String,
    // note the use of Number and not the integer type.
    Age : Number,
    position : String
})

// Do note that different schemas can not be used for the same model, thats like redefining it and that's not acceptible

// a demostration of extending a schema's inbuilt methods properties
// e.g for the playerSchema
playerSchema.methods.play = function(){
    console.log("I can play very well hooray")
}

// initiates a class to be used to create instances of the mongodb document.
let playerModel =  mongoose.model("Player",playerSchema)

// start by creating a single, new playerModel instance to use here.
// You can always instantiate new model instances as you wish with different names, but I highly recommend using a for loop to instantiate the models most of the time.
let player = new playerModel({name : "Ronny",Age : 22, position : " Dangerous striker"})

// calling it without the schema
/*let playerModelWrapper = mongoose.model("Player")
playerModelWrapper.find({},function(err,data){
    docs.forEach(function(item,index){
        console.log(item.name)
    })
})*/

// This worked perfectly fine better than the other asynchronous code function below

/*
let findAsync = async() => {
    let allPlayers = await playerModel.find() // store the awaited results in a variable
    console.log(allPlayers)
    allPlayers.forEach(function(item,index){
        console.log(item.name)
    })
}
findAsync()*/


// calling my added method
// called it before and after the save method to see its impact with the save method.
player.play()

//saving a model instance.
// we use the inbuilt model's save method.
player.save()
// I've also noted that the database keeps adding the record even if they are redundant.


// calling my added method
player.play()
let player2 = new playerModel({name : "Tommy",Age : 25, position : " Defender"})
player2.save()

// retreiving from the database

//for retrieval use the intial model and not instances.
// Find a different way of dipslaying the results of a find operatioon, whether its filtered or its as a whole.
let allPlayers = playerModel.find() // for finding all

//console.log(allPlayers)

let defenders = playerModel.find({position : "Defender"})


let findCallBackAsync = async function (){
    // dont pass a query to the find method.
    // Only use the filter in the result gotten.
    let allUsers = await playerModel.find() //ensure you declare a variable for the model.
    // the result returned is an array. so you can simply loop through an array.
    allUsers.forEach(function(item,index){
        let name = item.name
        console.log("name is"+name)        
    })
} 
findCallBackAsync()
console.log("The last part of the console and it worked.")

//console.log(defenders)
