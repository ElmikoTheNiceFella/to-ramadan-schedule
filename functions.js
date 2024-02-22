import { ramadanStarts, ramadanTimings } from "./constants.js";

const data = `
Print Mirza Baig
Winter 2024
Credit
AECH 2122 Principles of Chemical Eng ll
Enrolled 2.00 60% and Letter Grade B.Sc. - Engineering
LEC - Class 1352 -Section 1 02/01/2024 - 18/04/2024 Days: Sunday
Times: 12:00 to 14:00
12.1.10
AECH 2142 Basic Fluid Mechanics & Heat T
Enrolled 2.00 60% and Letter Grade B.Sc. - Engineering
LEC - Class 1354 -Section 2 02/01/2024 - 18/04/2024 Days: Monday
Times: 09:00 to 11:00
12.1.14
AECH 2332 Chemical & Processing Plant Tr
Enrolled 2.00 60% and Letter Grade B.Sc. - Engineering
LEC - Class 1369 -Section 1
LAB - Class 1371 -Section 3
02/01/2024 - 18/04/2024 Days: Wednesday
Times: 14:00 to 15:00
05.2.60
02/01/2024 - 18/04/2024 Days: Thursday
Times: 16:00 to 18:00
09.1.74
CHEM 3010 Petrochemistry
Enrolled 2.00 60% and Letter Grade B.Sc. - Engineering
Status Units Grading Basis Academic Program Requirement Designation
Class Start/End Dates Days and Times Room
Status Units Grading Basis Academic Program Requirement Designation
Class Start/End Dates Days and Times Room
Status Units Grading Basis Academic Program Requirement Designation
Class Start/End Dates Days and Times Room
Status Units Grading Basis Academic Program Requirement Designation
https://campus.udst.edu.qa/psc/csqaprd9/EMPLOYEE/SA/cT_FL.SSR_COMPONENT_FL.GBL?Page=SSR_VW_CLASS_FL 22/02/2024, 12:07 AM
Page 1 of 2
LEC - Class 1859 -Section 2
02/01/2024 - 18/04/2024
02/01/2024 - 18/04/2024
Days: Monday
Times: 12:00 to 13:00
Days: Wednesday
Times: 12:00 to 13:00
05.2.44
05.2.44
CHEM 3011 Petrochemistry (Lab)
Enrolled 1.00 60% and Letter Grade B.Sc. - Engineering
LAB - Class 1861 -Section 2 02/01/2024 - 18/04/2024 Days: Monday
Times: 14:00 to 17:00
05.1.13
COMM 1020 English Communication II
Enrolled 3.00 60% and Letter Grade B.Sc. - Engineering
LEC - Class 1908 -Section 17
02/01/2024 - 18/04/2024
02/01/2024 - 18/04/2024
Days: Wednesday
Times: 10:00 to 12:00
Days: Sunday
Times: 11:00 to 12:00
10.2.05
05.2.63
Class Start/End Dates Days and Times Room
Status Units Grading Basis Academic Program Requirement Designation
Class Start/End Dates Days and Times Room
Status Units Grading Basis Academic Program Requirement Designation
Class Start/End Dates Days and Times Room
https://campus.udst.edu.qa/psc/csqaprd9/EMPLOYEE/SA/cT_FL.SSR_COMPONENT_FL.GBL?Page=SSR_VW_CLASS_FL 22/02/2024, 12:07 AM
Page 2 of 2
`

function addToTiming(timing, duration) {
    // Get duration as hours and minutes
    const durationHours = Math.floor(duration / 60)
    const durationMinutes = duration % 60

    // Get timing as hours and minutes
    const timingHours = +timing.substring(0, 2)
    console.log(timingHours)
    const timingMinutes = +timing.substring(3, 5)

    // Calculate hours
    let hours = durationHours + timingHours

    // Calculate Minutes
    let minutes = durationMinutes + timingMinutes
    if (minutes >= 60) {
        hours++
        minutes -= 60
    }

    // Get Suffix
    const suffix = timing.substring(5, 7) == "PM" || hours >= 12 ? "PM" : "AM";

    // Format hours if minutes exceeds 60
    if (hours > 12) hours -= 12

    // Format hours and minutes
    let endTiming = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + suffix

    return endTiming
}

export function timingToNum(timing) {
    let hours = +timing.substring(0, 2);
    let minutes = +timing.substring(3, 5) / 60;
    
    if (timing.substring(5, 7) == "PM" && hours != 12) hours += 12

    return hours+minutes
}

function convertToAMPM(timing) {
    const formattedTiming = timing.padStart(5, '0')

    let hours = +formattedTiming.substring(0, 2)
    const minutes = formattedTiming.substring(3, 5)

    let suffix;

    suffix = hours > 11 ? "PM" : "AM"

    hours -= hours > 12 ? 12 : 0

    return String(hours).padStart(2, '0') + ':' + minutes + suffix
}

function timingToRamdan(timing) {
    // Get timing start
    let timings = timing.split(" to ") // 8:00AM to 11:00AM => ['8:00AM', '11:00AM']
    if (timings[0].length <= 5) {
        timings = timings.map(v => convertToAMPM(v))
    } else {
        timings = timings.map(v => v.padStart(7, '0')) // 8:00AM => 08:00AM & 11:00AM => 11:00AM
    }

    let start = ramadanStarts[timings[0]]

    // Calculate the duration
    let duration = timingToNum(timings[1]) - timingToNum(timings[0])

    console.log(duration)
    let ramadanDuration = ramadanTimings[duration*60]

    // Get timing end
    let end = addToTiming(start, ramadanDuration)

    return `${start} to ${end}`
}

/* ------------------------ */
/* Main conversion function */
/* ------------------------ */

export function analyzeData(data) {
    const lines = data.split("\n")
    
    let finalStuff = []
    
    let i = -1;
    for(let line of lines) {
        console.log(line)
        let course = "";
        if (/([A-Z]{4}\s[0-9]{4})/.test(line)) {
            course = line.match(/([A-Z]{4}\s[0-9]{4})/)[0]
            finalStuff.push({name: course})
            i++
        };
        if (i >= 0) {
            if (line.includes("Days:") || line.includes("Times:")) {
                if (finalStuff[i].timings) {
                    let timing = line.match(/(?<=:\s)(.*)/)[0]

                    if (/^T|^W|^M|S/.test(timing)) {
                        finalStuff[i].timings.push(timing)
                    } else {
                        finalStuff[i].timings.push(timingToRamdan(timing))
                    }

                }  else {
                    finalStuff[i].timings = [line.match(/(?<=:\s)(.*)/)[0]]
                }
            }
        }
    }

    return finalStuff
}

console.log(addToTiming("03:00PM", 120))