//we downloaded the json from inside the html file of cricinfo list of all series
// at present we get 587 series
//some are bilateral some are multi-team ones, to get more details we will have to go to each html and get the details

//1. today, ultimate aim is to get all inns score for all matches played

let a = require("./allOdis.json")

let seriesDetailArr = a["props"]["appPageProps"]["data"]["data"]["content"]["tables"][0].rows;

//these are the details we need in for each series
// -series no, same as index in above arr
// -series name
// -date started
// -matches played
// -arr of matches with
//      -date
//      -both inn score
//      -teams participating, and won

//but before that we need details of all series which means we need to scrape each series individually, all 587 of them

let {getHtmlUsingLinkAndStoreInFile} = require("./scrapeASeries")
async function findLinksToSeriesDetailPageAndStoreInJson()
{
    let i=585;//start index
    let end=929;
    for (;i<end;i++)
    {
        console.log("working on series no. ", i);
        let link = seriesDetailArr[i].items[0]?.link;
        if (!!!link)
        {
            let tryLen=seriesDetailArr[i].items?.length;
            for (let j=1;j<tryLen;j++)
            {
                link = seriesDetailArr[i].items[j]?.link;
                if (!!!link)break
            }
        }
        if (!!!link)
        {
            console.log("could not find link for series no. ", i)
            break;
        }
        await getHtmlUsingLinkAndStoreInFile(`https://www.espncricinfo.com${link}`,`series/${i}.json`)
    }
}

// findLinksToSeriesDetailPageAndStoreInJson();

//now that is done, we need to go thru the series one by one, find all the matches and links to their scorecards and other details we need
function getMatchDataFromSeries(filename)
{
    let seriesJson = require(filename);
    let m=seriesJson["props"]["appPageProps"]["data"]["content"]["matches"];
    let s = seriesJson["props"]["appPageProps"]["data"]["series"]
    let noOfMatches = m.length;
    let seriesObj={};
    seriesObj.noOfMatches=noOfMatches;
    seriesObj.matches=[];
    for(let i=0;i<noOfMatches;i++)
    {
        let matchObj = {};
        matchObj.objectId=m[i]["objectId"]
        matchObj.internationalNo=m[i]["internationalNumber"]
        matchObj.name=m[i].slug
        matchObj.state=m[i].stage
        matchObj.team1name= m[i].teams[0].team.name
        matchObj.team2name=  m[i].teams[1].team.name
        matchObj.team1score= m[i].teams[0].score
        matchObj.team2score= m[i].teams[1].score
        matchObj.result= m[i].statusText;
        matchObj.startTime=m[i].startTime;
        matchObj.matchLink=`https://espncricinfo.com/series/${s.slug}-${s.objectId}/${m[i].slug}-${m[i].objectId}/full-scorecard`
        seriesObj.matches.push(matchObj)
    }
    return seriesObj
}

function convertSeriesDataToGetAllMatchArray()
{
    const fs = require('fs');
    let allMatchArr = [];
    for(let i=0;i<929;i++)
    {
        let seriesJson = {}
        try{
            console.log("trying for series no ",i);
            seriesJson = getMatchDataFromSeries(`./series/${i}.json`)
            allMatchArr = [...allMatchArr,...seriesJson.matches]
        }
        catch(err)
        {
            console.log("Unable to get data for series no. ",i)
        }
    }
    fs.writeFileSync("allMatchesArr.json", JSON.stringify(allMatchArr,null,4), 'utf-8');
    return allMatchArr;

}
console.log(convertSeriesDataToGetAllMatchArray());



