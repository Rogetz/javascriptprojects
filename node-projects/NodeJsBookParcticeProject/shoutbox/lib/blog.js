// This is the model for the blog
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/ShoutBox")

// the blog schema
let blogSchema = new mongoose.Schema({
    author : String,
    title : String,
    body: String,
    date : Date// confirm the right data type for date object.
}
)
// the blog model.
let blogModel = mongoose.model("blog",blogSchema)

function blog(obj){
    for(var key in obj){
        this[key] = obj[key]
    }
}

blog.prototype.save = function(){
    let blog = this
    let createdBlog = new blogModel({author : blog.author,title : blog.title,body : blog.body,date : blog.date})
    // method for saving the blog.
    createdBlog.save()
    console.log("saved successfuly")
}
// note that the blog must have been linked to a particular user on the database and so deleting it woulld be easier.
blog.prototype.delete = function(){
    let blog = this
    async function responseDelete(){
        let deletedResponse = await blogModel.deleteMany({name : user.name})
        if(deletedResponse.deletedCount > 0){
            console.log("deletion of "+user.name+" succesful")
        }
    }
    responseDelete()
}
blog.prototype.search = function(){
    let blog = this
    async function findResponse(){
        let foundResponse = await blogModel.find({author : blog.author})
        foundResponse.forEach(function(item,index){
            let author = item.author
            let title = item.title
            let body = item.body
            let date = item.date
            console.log(author+" "+title+"  "+body+" "+date+" ")
        })
    }
    findResponse()
}

let firstBlog = new blog({author: "Ronny",title: "My first blog",body: "The blog.s body is this, but it really has nothing",date: 16/3/2023})
firstBlog.save()