import {itraWebsite} from './itra.js'
import {myCertWebsite, retry} from './myCert.js'
import {leeWebsite} from './leeaint.js'
import externalBadgesModel from '../../../database/models/externalCandidateBadgesModel.js'
// const Leeaint =await leeaint('7112', '19230')
// const Itra = itra('46999', 'zaky')
// const MmyCert =await myCert('229435')

export const runScrapingandPushTodb= async(candidateId,scrappingObj)=>{

if(scrappingObj.leeWebsiteId) {
    const Leeaint =await leeWebsite(scrappingObj.leeCompany, scrappingObj.leeRegNumber)
    if(Leeaint.length) {
    Leeaint.forEach(element => {
        element.websiteId = scrappingObj.leeWebsiteId
        element.candidateId = candidateId
        
    });
    if(Leeaint.length , 'lee') {
    console.log(Leeaint.length);
    await externalBadgesModel.insertMany(Leeaint)
    }
    }
    }
 if(scrappingObj.itraWebsiteId){
    const Itra = await itraWebsite(scrappingObj.itraRegNumber, scrappingObj.itraName)
        if(Object.keys(Itra).length !== 0){
            Itra.websiteId = scrappingObj.itraWebsiteId
            Itra.candidateId = candidateId
        }
        if(Object.keys(Itra).length !== 0){
        console.log(Itra);
        await externalBadgesModel.insertMany(Itra)
        }
}



if(scrappingObj.mycertWebsiteId) {
const MyCert =await myCertWebsite(scrappingObj.myCertRegNumber)
// const MyCert =await retry(myCertWebsite(scrappingObj.myCertRegNumber) , 3)

if(MyCert.length) {
    MyCert.forEach(element => {
    element.websiteId = scrappingObj.mycertWebsiteId
    element.candidateId = candidateId
    
});
if(MyCert.length) {
console.log(MyCert.length , 'mycert');
await externalBadgesModel.insertMany(MyCert)
}
}
}
}