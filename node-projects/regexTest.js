
// after the dot I have added a + modifier to prevent it from altering the \w 
let regexOne = /\.+\w+$/   //note that in js for every bracket you enclose, its another group and increases the number of outputs, since it returns all groups separately
let CssName = "testPage.css"
let matchedRegex = CssName.match(regexOne)// its like every string in javascript has this match function.
console.log("The matched regex here is  "+matchedRegex)
if(matchedRegex == ".css"){
    console.log("true its working")
}
//  /\.+\\+node_modules/
// this is for detecting javascript files from the node module, the node-modules folder
let regexTwo = /\.+\\node_modules/
let regexFour = /^node_modules/
// Remember that you have to escape the \ in the link since n here refers to the new line escape character
let linkRefference = "..\\node_modules\\socket.io\\client-dist\\socket.io.js"
let linkRefference3 = "node_modules\\socket.io\client-dist\socket.io.js"
let matchedRegexTwo = linkRefference.match(regexTwo)
console.log("The matched regex is "+matchedRegexTwo)
let matchedRegex3 = linkRefference3.match(regexFour)
console.log("The matched Regex for the third link Reference is:"+matchedRegex3)
if(matchedRegex3 != null){
    console.log("The third regex isn't empty")
}


let regexThree = /^(\.+\\)/
console.log(linkRefference.match(regexThree))
let matchDesc = linkRefference.match(regexThree)
console.log(matchDesc)
replacedString = linkRefference.replace(regexThree,"")
console.log(replacedString)