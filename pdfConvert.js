// Getting data
import { PdfReader } from "pdfreader";

function hel(schedule) {
    return new Promise((resolve, reject) => {
        let arr = [];
        new PdfReader().parseFileItems(schedule, function(err, item) {
            if (err) {
                reject(err);
            } else if (!item) {
                resolve(arr);
            } else if (item.text) {
                arr.push(item);
            }
        });
    });
}

let data = await hel("Test4.pdf").then(result => result).catch(error => console.error(error));
let finalResult = {}

for(let i = 0; i < data.length; i++) {
    if (finalResult[data[i].y]) {
        finalResult[data[i].y] = [...finalResult[data[i].y], data[i].text]
    } else {
        finalResult[data[i].y] = [data[i].text]
    }
}

let cleanedData = []

console.log(finalResult)