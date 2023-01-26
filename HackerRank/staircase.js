
function staircaseCreator(inputValue){
    var staircase = [];
    var changingLimit  = (inputValue - 1);
    for(i = 1 ; i <= inputValue ; i++){
        // confirm if there's a way to declare the array by its size in javascript.
        var singleStep = [];
        for(j = 1 ; j <= inputValue ; j++){
            if(j <= changingLimit){
                let singleArray = [" "];
                singleStep += singleArray;
            }
            else{
                let singleArray = ["*"];
                // just learnt from python about the array concatenation and am using the same concept over here.
                singleStep += singleArray;
            }
        }
        changingLimit -= 1;
        staircase.push(singleStep);
    }
    // for displaying it as a table
    console.table(staircase);
    console.log(staircase);
}

staircaseCreator(8);

// try and catch the input value if its not an integer from what I learnt in python.