var fs = require('fs')
var path = require('path')

var count = 0

// The watch function works more or less like a a server.
// The listener however seems to repeat itself three times for every one instance and thats where I now have a problem with.

/*
fs.watch(path.join(__dirname,"test.txt"),{encoding : "buffer"},(even,fileName) => {
    if(even == 'change'){
        console.log(++count+"File has been changed")// works perfectly fine the only problem is that it repeats three times.
    }
    else if(even == "rename"){
        console.log(++count+"File has been renamed.")
    }
})*/

// Then there's a wtchFile method which after using proved to be better.
// note that you can also set timer opions in the watchFile method in the options parameter.
console.log('watcher on the look out')
fs.watchFile(path.join(__dirname,"test.txt"),function(currentState,previoustate){
    // I haven't found a way to change to compare the previous state with the current state.
    // each time it evaluates that the current state is the same as the previous file.
    // so I just have to reload the entire file each time there;s a change detected.
    // you can work with the readFile method without using the fs.Stats instance, currentState and the PreviousState that we have already declared.
    if(previoustate == currentState){
        console.log('the state unchanged.')
    }
    else{
        console.log("state changed. And this means it evaluates even if there's no difference")
    }
    console.log("The previous state is "+previoustate.toString())
    console.log("The current state is "+currentState.toString())
    fs.readFile(path.join(__dirname,"test.txt"),function(error,data){
        if(error){
            console.log("bad error")
        }
        else if(data){
            console.log("the data has been read out successfuly")
        }
    })
    if(currentState.isFile()){
        console.log("The current state is a file")
        fs.readFile(currentState,function(error,data){
            if(error){
                console.log("bad error")
            }
            else if(data){
                console.log("the data has been read out successfuly\n its data is :\n")
                console.log(data)
            }
        })
    }
    else{
        console.log("the current state isn't a file")
    }
})
