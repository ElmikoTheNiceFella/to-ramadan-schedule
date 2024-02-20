import { ramadanStarts, ramadanTimings } from "./constants.js";

const data = `
2/20/24, 6:43 AM View My Classes
https://campus.udst.edu.qa/psc/csqaprd9_21/EMPLOYEE/SA/c/SSR_STUDENT_FL.SSR_MD_SP_FL.GBL?Action=U&MD=Y&GMenu=SSR_STUD… 1/2
Print
Abd El Hakim Akhadkhou
Winter 2024
Credit
COMM 1020 English Communication II
Enrolled 3.00 60% and Letter Grade B.Sc. - IT
Lecture - Class 1895 -Section 4
02/01/2024 - 18/04/2024
02/01/2024 - 18/04/2024
Days: Thursday
Times: 9:30AM to 11:00AM
Days: Sunday
Times: 9:30AM to 11:00AM
05.1.65
05.1.65
INFS 1201 Computer Programming
Enrolled 4.00 60% and Letter Grade B.Sc. - IT
Lecture - Class 2575 -Section 1
Laboratory - Class 2576 -Section 2
02/01/2024 - 18/04/2024
02/01/2024 - 18/04/2024
Days: Tuesday
Times: 8:00AM to 9:30AM
Days: Sunday
Times: 8:00AM to 9:30AM
01.2.08
01.2.08
02/01/2024 - 18/04/2024 Days: Monday
Times: 2:00PM to 5:00PM
10.2.04
INFT 1201 Computer Hardware
Enrolled 4.00 60% and Letter Grade B.Sc. - IT
Lecture - Class 2670 -Section 5
Laboratory - Class 2671 -Section 6
02/01/2024 - 18/04/2024 Days: Wednesday
Times: 2:00PM to 5:00PM
10.1.13
02/01/2024 - 18/04/2024 Days: Monday
Times: 9:30AM to 12:30PM
10.1.13
MATH 1020 Pre-Calculus
Status Units Grading Basis Academic Program Requirement Designation
Class Start/End Dates Days and Times Room
Status Units Grading Basis Academic Program Requirement Designation
Class Start/End Dates Days and Times Room
Status Units Grading Basis Academic Program Requirement Designation
Class Start/End Dates Days and Times Room
2/20/24, 6:43 AM View My Classes
https://campus.udst.edu.qa/psc/csqaprd9_21/EMPLOYEE/SA/c/SSR_STUDENT_FL.SSR_MD_SP_FL.GBL?Action=U&MD=Y&GMenu=SSR_STUD… 2/2
Enrolled 3.00 60% and Letter Grade B.Sc. - IT
Lecture - Class 2062 -Section 11
02/01/2024 - 18/04/2024
02/01/2024 - 18/04/2024
02/01/2024 - 18/04/2024
Days: Tuesday
Times: 2:00PM to 3:00PM
Days: Thursday
Times: 2:00PM to 3:00PM
Days: Sunday
Times: 2:00PM to 3:00PM
12.2.37
05.1.56
05.2.37
Status Units Grading Basis Academic Program Requirement Designation
Class Start/End Dates Days and Times Room
`

function timingToNum(timing) {
    let hours = +timing.substring(0, 2)
    let minutes = (+timing.substring(3, 5)) / 60
    if (timing.substring(5,7) === "PM" && timing.substring(0,2) !== "12") {
        hours += 12
    }
    return [hours, minutes]
}

function numToTiming(timing) {
    let prefix;

    let minutes = timing % 1
    let hours = Math.floor(timing)

    if (hours > 11) {
        prefix = "PM"
        hours -= timing == 12 ? 0 : 12
    } else { prefix = "AM" }

    return `${hours}`.padStart(2, '0')+`:${minutes * 60}${prefix}`
}

function timingToRamadan(timing) {
    // Seperate Timings
    let timings = timing.split(" to ")
    timings = timings.map(v => v.padStart(7, '0'))

    // Initialize new timings
    let timing1;
    let timing2;

    // Convert timing to a calculatable value
    timings.forEach((timing, i) => {
        let [hours, minutes] = timingToNum(timing)

        i == 0 ? timing1 = hours + minutes : timing2 = hours + minutes;
    })

    // Get the starting hour and the class duration
    let start = ramadanStarts[timings[0]]
    let duration = ramadanTimings[(timing2 - timing1) * 60]
    
    // Get the class ending time
    let end = numToTiming(Math.floor(timingToNum(start).reduce((acc, curr) => acc + curr, 0)*10)/10 + duration)

    return [start, end]
}

function analyzeData(data) {
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
                    finalStuff[i].timings.push(timing)
                }  else {
                    finalStuff[i].timings = [line.match(/(?<=:\s)(.*)/)[0]]
                }
            }
        }
    }



    return finalStuff
}

console.log(analyzeData(data))
console.log(timingToRamadan('8:00AM to 9:30AM'))
console.log(timingToRamadan('9:30AM to 12:30PM'))
console.log(timingToRamadan('2:00PM to 3:00PM'))
console.log(timingToRamadan('9:30AM to 11:00AM'))
