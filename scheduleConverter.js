import { analyzeData, timingToNum } from "./functions.js";

// Demo data
const data = `
Osama Siddique
Winter 2024
Credit
GARC 2002 Globalization & Environment
Status
Units
Grading Basis
Academic Program
Requirement Designation
Enrolled
3.00
60% and Letter Grade
B.Sc. - IT
 
Class
Start/End Dates
Days and Times
Room
Lecture - Class 2010 -Section 1
02/01/2024 - 18/04/2024
 
Days: Thursday
Times: 11:00AM to 2:00PM
10.2.05
 
 
INFS 4101 IS Management & Strategy
Status
Units
Grading Basis
Academic Program
Requirement Designation
Enrolled
3.00
60% and Letter Grade
B.Sc. - IT
 
Class
Start/End Dates
Days and Times
Room
Lecture - Class 2663 -Section 1
02/01/2024 - 18/04/2024
 
Days: Thursday
Times: 5:00PM to 8:00PM
10.2.12
 
 
INFS 4103 UI/UX Design
Status
Units
Grading Basis
Academic Program
Requirement Designation
Enrolled
3.00
60% and Letter Grade
B.Sc. - IT
 
Class
Start/End Dates
Days and Times
Room
Lecture - Class 2664 -Section 1
02/01/2024 - 18/04/2024
 
Days: Sunday
Times: 12:00PM to 2:00PM
10.2.12
 
 
Laboratory - Class 2665 -Section 2
02/01/2024 - 18/04/2024
 
Days: Monday
Times: 9:30AM to 12:30PM
10.2.33
 
 
SSHA 1004 Ethical Reasoning
Status
Units
Grading Basis
Academic Program
Requirement Designation
Enrolled
3.00
60% and Letter Grade
B.Sc. - IT
 
Class
Start/End Dates
Days and Times
Room
Lecture - Class 2201 -Section 1
02/01/2024 - 18/04/2024
 
02/01/2024 - 18/04/2024
 
Days: Tuesday
Times: 8:00AM to 9:30AM
Days: Thursday
Times: 8:00AM to 9:30AM
05.2.65
 
05.2.65
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

    return days
}

console.log(extractSchedule(data))