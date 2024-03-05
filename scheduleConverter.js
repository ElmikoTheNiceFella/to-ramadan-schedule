import { analyzeData, timingToNum, breakCalculator, analyzeInstructorData, studentDemoData, instructorDemoData } from "./functions.js";

/* -------------------------- */
/* Data Refactoring Functions */
/* -------------------------- */

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
            } else {
                if (days[day].length > 0 && days[day][0][1].substring(0, 7) !== "08:00AM") {
                    currentDay.unshift(["", ""])
                }
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