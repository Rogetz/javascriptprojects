let connect = require("connect")

let app = connect()

// note that the customizable method only takes its parameter and not the req and res objects.
function myCustomizer(name){

    let fullName = name + "Odhiambo"
    // even the returned function still has to have a name.
    // in short its this method below that actually gets used by the connect server.
    //this method however has full access to the contents of the customizer since its returned inside it
    return function nameHandler(req,res){
        console.log("The full name is "+fullName)
        // always place the Content-Type header for all responses.
        res.setHeader("Content-Type","text/plain")
        res.write("The full name is "+fullName);
        // always for ending things
        res.end("The full name is "+fullName);
    };
}

/*
// I have defined this function intentonally here to see if it works when its outside.
function nameHandler(req,res,next){
    console.log("The school's name is "+schoolName)
    // always place the Content-Type header for all responses.
    //res.setHeader("Content-Type","text/plain")
    res.end("The school's name is "+schoolName)
}

function myCustomizer2(school){

    let schoolName = school 
    // doesn't work with a method that's defined outside the function. It must be simply defined within the function.
    return nameHandler(req,res,next);    
}*/

app.use(myCustomizer("Ronny"))
.listen(3701)
console.log("app listening at port 3701")