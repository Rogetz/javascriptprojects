const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ShoutBox")


let testSchema2 = new mongoose.Schema({
    // this date data type is what might be known as BSON data type and it worked perfectly
    currentTime : Date,
    name : String
})

let testModel2 = mongoose.model("testCollection2",testSchema2)

// always create a date object here before saving, remember you use the same style for saving a date object directly in mongodb
// This new Date object works exactly the same as in mongodb
let currentTime = new Date(Date.now())
// I've added a dae directly
let firstDocument = new testModel2({currentTime :currentTime ,name: "Ronny"})
firstDocument.save()
console.log("new document saved successfuly")