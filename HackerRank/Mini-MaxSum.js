var positiveIntegersArray = [5,43,4,8,2,80,1,0,100];

function maxMinSum(arrayVar){
    var minimum = 0;
    var maximum = 0;
    var sortedArray = arrayVar.sort((a,b) => a-b);
    for(i = 0; i < 4; i++){
        minimum += sortedArray[i]
    }
    var reversedArray = sortedArray.reverse();
    for(i = 0; i < 4; i++){
        maximum += reversedArray[i];
    }
    console.log(minimum.toString()+" "+ maximum.toString())
}

maxMinSum(positiveIntegersArray);