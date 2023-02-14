//  This basically contains the code to serve the server side socket.io package.

var socketio = require("socket.io");
// there's way to juing
var iot; // I used this style to show that the server name and the client side need not tbe the same.
// seems like the client side socket.io.js has its won definition of creating the socket.
// teh io is a global variable in the client side

exports.listen = function serverSetup(server){
    // not a must to use io variable name.
    iot = socketio(server);// don't use that crap called listen, and also don't specify the port directly it will cause an error, inorder to share it simply pass the server to it.
    // I think the problem is that probably there's a way am noty calling the client side socket.io js properly.
    // also investigate on the right way to really call upon the connection event of the sockets whether its directly as in this  case or through sockets.
    // I copied this from the socket.io's site.
    iot.on('connection',function(socket){
        socket.emit("connection-result","True");
        console.log("There\'s some connection detected");
    });
}