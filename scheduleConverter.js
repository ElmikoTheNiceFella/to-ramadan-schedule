import { analyzeData, timingToNum, breakCalculator, analyzeInstructorData } from "./functions.js";

// Demo data
const instructorDemoData = `
My Teaching Schedule > Winter 2024 > University of Doha
My Teaching Schedule > Winter 2024 > University of Doha     Personalize | Zoom My Teaching Schedule > Winter 2024 > University of Doha |          First Show previous row (inactive button) (Alt+,) 1-12 of 12 Show next row (inactive button) (Alt+.) Last
                                    Class Class Title Enrolled    Days & Times      Room  Class Dates
Access Class Roster
Grade Roster
Access Gradebook
Class Assignments
Change
LMS
COMM 1020-11
(1902)
English Communication II (Lecture)
30
Mo 11:00AM - 12:30PM
12.1.19
Jan 2, 2024-
Apr 18, 2024
                                                      
We 11:00AM - 12:30PM
12.1.19
Jan 2, 2024-
Apr 18, 2024
Access Class Roster
Grade Roster
Access Gradebook
Class Assignments
Change
LMS
COMM 1020-21
(1912)
English Communication II (Lecture)
31
Mo 3:30PM - 5:00PM
10.2.06
Jan 2, 2024-
Apr 18, 2024
                                                      
We 3:30PM - 5:00PM
10.2.06
Jan 2, 2024-
Apr 18, 2024
Access Class Roster
Grade Roster
Access Gradebook
Class Assignments
Change
LMS
COMM 1020-37
(1928)
English Communication II (Lecture)
30
Su 2:00PM - 4:00PM
10.2.05
Jan 2, 2024-
Apr 18, 2024
                                                      
Tu 2:00PM - 3:00PM
05.2.65
Jan 2, 2024-
Apr 18, 2024
Access Class Roster
Grade Roster
Access Gradebook
Class Assignments
Change
LMS
COMM 1020-41
(1932)
English Communication II (Lecture)
31
Tu 6:00PM - 8:00PM
05.1.57
Jan 2, 2024-
Apr 18, 2024
                                                      
Th 5:00PM - 6:00PM
05.2.63
Jan 2, 2024-
Apr 18, 2024
Access Class Roster
Grade Roster
Access Gradebook
Class Assignments
Change
LMS
EFFL 1002-14
(1993)
Applied& Experiential Learning (Lecture)
30
Tu 4:00PM - 6:00PM
05.1.59
Jan 2, 2024-
Apr 18, 2024
                                                      
Th 2:00PM - 3:00PM
05.1.64
Jan 2, 2024-
Apr 18, 2024
Access Class Roster
Grade Roster
Access Gradebook
Class Assignments
Change
LMS
EFFL 1002-7
(1986)
Applied& Experiential Learning (Lecture)
30
Mo 2:00PM - 3:30PM
05.2.68
Jan 2, 2024-
Apr 18, 2024
                                                      
We 2:00PM - 3:30PM
05.2.68
Jan 2, 2024-
Apr 18, 2024`
const studentDemoData = `
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

export function extractScheduleStudent(userData) {
    
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
        days[day].sort((a,b) => a[1].length > 30 ? timingToNum(a[1].substring(a[1].length-19,a[1].length-12)) - timingToNum(b[1].substring(0,7)) : b[1].length > 30 ? timingToNum(a[1].substring(0,7)) - timingToNum(b[1].substring(b[1].length-19,b[1].length-12)) : timingToNum(a[1].substring(0,7)) - timingToNum(b[1].substring(0,7)))
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

export function extractScheduleInstructor(userData) {
    const data = analyzeInstructorData(userData)

    let days = {
        "Sunday": [],
        "Monday": [],
        "Tuesday": [],
        "Wednesday": [],
        "Thursday": []
    }

    for(let course of Object.keys(data)) {
        const classes = data[course]
        for(let classInfo of classes) {
            days[classInfo[0]].push([course, classInfo[1]])
        }
    }

    return days
}

console.log(extractScheduleStudent(studentDemoData))
console.log("--------------------------------------------------")
console.log(extractScheduleInstructor(instructorDemoData))