window.alert("the external js is actually working")

//Open this after I have verified that the index.html can indeed refer to the js files.
// funny thing is that this thing iis working even if I change the variable to tro.connect() seems like this is very simple.
var socket = io.connect()
socket.on("connection-result",function(booleanResult){
    alert("The connection establishment is"+booleanResult)
})

