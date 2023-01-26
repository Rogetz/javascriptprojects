var candleHeights = [4,4,3,2,4,2,3];
// worked perfectly fine.
// was meant to take count of the tallest candles and output them.

console.log(candleHeights.sort((a,b) => a-b).join(","))

function tallestCalculator(candles){
    var sortedArray = candles.sort((a,b) => b-a);
    var tallestCount = 0;
    sortedArray.forEach(function(item,index){
        if(item == sortedArray[0]){
            tallestCount += 1;
        }
    });
    console.log(tallestCount);
}
tallestCalculator(candleHeights);