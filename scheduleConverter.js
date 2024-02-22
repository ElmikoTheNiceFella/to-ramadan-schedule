import { analyzeData, timingToNum, breakCalculator } from "./functions.js";

// Demo data
const data = `
Abd El Hakim Akhadkhou
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
B.Sc. - IT
 
Class
Start/End Dates
Days and Times
Room
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
Status
Units
Grading Basis
Academic Program
Requirement Designation
Enrolled
4.00
60% and Letter Grade
B.Sc. - IT
 
Class
Start/End Dates
Days and Times
Room
Lecture - Class 2575 -Section 1
02/01/2024 - 18/04/2024
 
02/01/2024 - 18/04/2024
 
Days: Tuesday
Times: 8:00AM to 9:30AM
Days: Sunday
Times: 8:00AM to 9:30AM
01.2.08
 
01.2.08
 
 
Laboratory - Class 2576 -Section 2
02/01/2024 - 18/04/2024
 
Days: Monday
Times: 2:00PM to 5:00PM
10.2.04
 
 
INFT 1201 Computer Hardware
Status
Units
Grading Basis
Academic Program
Requirement Designation
Enrolled
4.00
60% and Letter Grade
B.Sc. - IT
 
Class
Start/End Dates
Days and Times
Room
Lecture - Class 2670 -Section 5
02/01/2024 - 18/04/2024
 
Days: Wednesday
Times: 2:00PM to 5:00PM
10.1.13
 
 
Laboratory - Class 2671 -Section 6
02/01/2024 - 18/04/2024
 
Days: Monday
Times: 9:30AM to 12:30PM
10.1.13
 
 
MATH 1020 Pre-Calculus
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