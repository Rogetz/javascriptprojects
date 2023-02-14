/*I've now understood the process.cwd and the __dirname.
process.cwd is completely unrelated with the source script, it will display the folder where the node command was launched
__dirname is what is actually related to the script. It gives the absolute path to the script folder, and not the actual script file.
Like lets say D:/javascriptprojects  but not D:/javascriptprojects/test.js*/ 

console.log(process.cwd())// concerned with node.
// they are very different.
console.log(__dirname)// concerned with the script file.