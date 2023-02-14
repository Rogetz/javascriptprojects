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
            // find a way to test if its a symbol that's being replaced or a string, so that you may effeiciently use the
            // split by space since its the easiest
            // so I have changed it to split at spaces for the time being, subject to change.
            var dataArray = data.split(" ");
            dataArray.forEach((item,index) => {
                // I've realized the mistake, the array that am using only works with single letters and not words.
                if (item == originalContent){
                    // note that if you specify 1 it deletes two so specify 0 for it to delete only what you wanted.
                    dataArray.splice(index,(index + originalContent.length),newContent)
                    // assigning the right index is now the only challenge since this is a word and not a symbol
                    //dataArray[index] = newContent ommited this for a while, testing the splice method.              
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
fileUpdater("Test3.txt","symbol","Replaced hooray")