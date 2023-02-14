var fileSystemModule = require('fs')
var path = require('path')

// readFile and writeFile are both asynchronous.
// writeFile deletes everything though before writing.

function fileUpdater(file,originalContent,newContent){
    fileSystemModule.readFile(path.join(__dirname,file),{encoding : 'utf-8'},function(err,data){
        if (err){
            console.log("there has been an error")
        }
        else{
            var dataArray = data.split("");
            dataArray.forEach((item,index) => {
                if (item == originalContent){
                    // note that if you specify 1 it deletes two so specify 0 for it to delete only what you wanted.
                    dataArray.splice(index,(index+originalContent.length),newContent)
                    dataArray[index] = newContent              
                }
            })
            try {
                // remember that the writeFile and the readFile only work  well with the string and buffer type and not the array type.
                fileSystemModule.writeFile(path.join(__dirname,file),dataArray.join(""),(error) => {
                    if(error){
                        console.log("unable to write due to some error.")
                    }
                    else{
                        console.log("data updated successfully")
                    }
                })
            } catch (error) {
                console.log("some isuue with the data type provided")
            }
            console.log("\n")
            console.log(data)
        }
    })
}



fileSystemModule.readFile(path.join(__dirname,'test2.txt'),{encoding : 'utf-8'},function(err,data){
    if (err){
        console.log("there has been an error")
    }
    else{
        var dataArray = data.split("");
        dataArray.forEach((item,index) => {
            if (item == ";"){
                // note that if you specify 1 it deletes two so specify 0 for it to delete only what you wanted.
                dataArray.splice(index,index+1, " replaced the semicolon with my words")
                //dataArray[index] = " replaced the semicolon with my words"               
            }
        })
        try {
            // remember that the writeFile and the readFile only work  well with the string and buffer type and not the array type.
            fileSystemModule.writeFile(path.join(__dirname,'test2.txt'),dataArray.join(""),(error) => {
                if(error){
                    console.log("unable to write due to some error.")
                }
            })
        } catch (error) {
            console.log("some isuue with the data type provided")
        }
        console.log("\n")
        console.log(data)
        /* I was testing for the actual thing being returned.
        console.log("\n")
        console.log(dataArray.join(""))*/
    }
})

// if you use the function without the function keyword then ensure you use the => symbol
/*fileSystemModule.writeFile(path.join(__dirname,"test.txt"),"This I have added",(error) => {
    if(error){
        console.log("unable to write due to some error.")
    }
})*/


// you can pass the newline to ensure a space is created before any other thing is appended.
/*fileSystemModule.appendFile(path.join(__dirname,"test.txt"),"\nthis I have appended",(error) => {
    if(error){
        console.log("There has been an erro my guys")
    }
})*/


// take note that the path.join()  adds the slashes for you.
console.log(path.join(__dirname,'test.txt'))