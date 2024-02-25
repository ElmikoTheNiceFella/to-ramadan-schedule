import { analyzeData, timingToNum, breakCalculator } from "./functions.js";

// Demo data
const data = `
Press Control+M to start dragging object
Print
Abdul Rahman Aboo Backer
Winter 2024
Credit
COMM 1020 English Communication II
Status
Units
Grading Basis
Academic Program
Requirement Designation
Enrolled
3.00
60% and Letter Grade
B.B.A - Business
 
Class
Start/End Dates
Days and Times
Room
LEC - Class 3043 -Section 47
02/01/2024 - 18/04/2024
 
02/01/2024 - 18/04/2024
 
Days: Tuesday
Times: 13:00 to 14:00
Days: Thursday
Times: 14:00 to 16:00
05.2.61
 
05.1.58
 
 
HRMG 1001 Principles of Human Resource M
Status
Units
Grading Basis
Academic Program
Requirement Designation
Enrolled
3.00
60% and Letter Grade
B.B.A - Business
 
Class
Start/End Dates
Days and Times
Room
LEC - Class 1131 -Section 3
02/01/2024 - 18/04/2024
 
Days: Sunday
Times: 10:00 to 12:00
12.1.01
 
 
LAB - Class 1132 -Section 4
02/01/2024 - 18/04/2024
 
02/01/2024 - 18/04/2024
 
Days: Monday
Times: 10:00 to 12:00
Days: Tuesday
Times: 10:00 to 11:00
05.2.44
 
05.2.44
 
 
INFS 1201 Computer Programming
Status
Units
Grading Basis
Academic Program
Requirement Designation
Enrolled
4.00
60% and Letter Grade
B.B.A - Business
 
Class
Start/End Dates
Days and Times
Room
LEC - Class 2575 -Section 1
02/01/2024 - 18/04/2024
 
02/01/2024 - 18/04/2024
 
Days: Tuesday
Times: 08:00 to 09:30
Days: Sunday
Times: 08:00 to 09:30
01.2.08
 
01.2.08
 
 
LAB - Class 2576 -Section 2
02/01/2024 - 18/04/2024
 
Days: Monday
Times: 14:00 to 17:00
10.2.04
 
 
SSHA 1004 Ethical Reasoning
Status
Units
Grading Basis
Academic Program
Requirement Designation
Enrolled
3.00
60% and Letter Grade
B.B.A - Business
 
Class
Start/End Dates
Days and Times
Room
LEC - Class 2206 -Section 6
02/01/2024 - 18/04/2024
 
02/01/2024 - 18/04/2024
 
Days: Thursday
Times: 12:30 to 14:00
Days: Sunday
Times: 12:30 to 14:00
12.1.19
 
12.1.19
`

/* ----------------------------- */
/* Main data extraction function */
/* ----------------------------- */

export function extractSchedule(userData) {
    
    let days = {
        "Sunday": [],
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": []
    }

    if (userData == "") return days

    const data = analyzeData(userData)

    for(let course of data) {
        for(let i = 0; i < course.timings.length; i += 2) {
            days[course.timings[i]].push([course.name, course.timings[i+1]])
        }
    }

    for(let day of Object.keys(days)) {
        days[day].sort((a,b) => timingToNum(a[1].substring(0,7)) - timingToNum(b[1].substring(0,7)))
    }

    for(let day of Object.keys(days)) { 
        const currentDay = days[day]
        for(let i = 0; i < currentDay.length; i++) {
            if (i !== 0) {
                const time1 = timingToNum(currentDay[i][1].substring(0,7)) * 60

                const time2 = timingToNum(currentDay[i-1][1].substring(11,currentDay[i-1][1].length)) * 60

                const gap = breakCalculator(time1 - time2)

                currentDay.splice(i, 0, ["", gap])
                i++
            }
        }
        days[day] = currentDay
    }

    return days
}

console.log(extractSchedule(data))