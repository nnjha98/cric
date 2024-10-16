let {maxWindowCalculator}=require("./maxInWindowCalculator")

let w = maxWindowCalculator(5)

let m=require("./allMatchesArr.json")
m=m.map((el,i,a)=>{
    el.i=i
    el.t1a=w(parseInt(el.team1score?.split(`/`)[0]))
    el.t2a=w(parseInt(el.team2score?.split(`/`)[0]))
    return el
})
let fs = require(`fs`)
fs.writeFileSync("allMatchesArr_windowOf5.json", JSON.stringify(m,null,4), 'utf-8');
