function maxWindowCalculator(len)
{
    let sortedList = [];
    for(let i=0;i<len;i++)sortedList.push(0)
    function compareAndAddToListIfBigger(num)
    {
        console.log("sortedList on enter: ", sortedList)
        if(!!!num)return -1
        if (num<sortedList.slice(-1)[0])return -1
        for(let i=0;i<sortedList.length;i++)
        {
            if(num>=sortedList[i]){
                sortedList = [...sortedList.slice(0,i), num, ...sortedList.slice(i)]
                sortedList = sortedList.slice(0,-1);
                return i;
            }
        }
    }
    return compareAndAddToListIfBigger;
}

module.exports={maxWindowCalculator}