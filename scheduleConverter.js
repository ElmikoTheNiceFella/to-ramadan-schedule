import { analyzeData } from "./functions.js";

// Demo data
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
        days[day].sort((a,b) => +a[1].substring(0,2) - +b[1].substring(0,2))
    }

    return days
}

console.log(extractSchedule(data))