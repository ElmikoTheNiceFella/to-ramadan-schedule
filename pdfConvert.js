// Getting data
import { PdfReader } from "pdfreader";

function hel() {
    return new Promise((resolve, reject) => {
        let arr = [];
        new PdfReader().parseFileItems("Test1.pdf", function(err, item) {
            if (err) {
                console.error("error:", err);
                reject(err);
            } else if (!item) {
                console.warn("end of file");
                resolve(arr);
            } else if (item.text) {
                console.log(item);
                arr.push(item);
            }
        });
    });
}

hel().then(result => console.log(result)).catch(error => console.error(error));