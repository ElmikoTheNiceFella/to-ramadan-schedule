import { addToTiming, analyzeData, timingToNum, breakCalculator, analyzeInstructorData, errorTimingToData } from "./functions.js";
import {studentDemoData, instructorDemoData} from './constants.js'

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
    // Add days and timings to days object
    console.log(data)
    for(let course of data) {
        for(let i = 0; i < course.timings.length; i += 2) {
            if (course.timings[i+1][0].length <= 30) {
                days[course.timings[i]].push([course.name, course.timings[i+1][0],timingToNum(course.timings[i+1][0].substring(11,19)) - timingToNum(course.timings[i+1][0].substring(0,7)), course.timings[i+1][1]])
            } else {
                days[course.timings[i]].push([course.name, course.timings[i+1][0],errorTimingToData(course.timings[i+1][0])[0], course.timings[i+1][1]])
            }
        }
    }

    // Sort by time
    for(let day of Object.keys(days)) {
        days[day].sort((a,b) => a[1].length > 30 ? timingToNum(a[1].substring(a[1].length-19,a[1].length-12)) - timingToNum(b[1].substring(0,7)) : b[1].length > 30 ? timingToNum(a[1].substring(0,7)) - timingToNum(b[1].substring(b[1].length-19,b[1].length-12)) : timingToNum(a[1].substring(0,7)) - timingToNum(b[1].substring(0,7)))
    }
    console.log(days)
    // Add Breaks
    for(let day of Object.keys(days)) { 
        const currentDay = days[day]
        for(let i = 0; i < currentDay.length; i++) {
            if (i % 2) {
                const time1 = timingToNum(currentDay[i][1].substring(0,7)) * 60
                const time2 = timingToNum(currentDay[i-1][1].substring(11)) * 60  
                const gap = breakCalculator(time1 - time2)
                if (gap === "Unknown Break Time") {
                    let gapHeight;
                    if (isNaN(time1) && isNaN(time2)) {
                        const startTime1 = errorTimingToData(currentDay[i-1][1])[2]
                        const [durationH2, _2, startTime2, _4] = errorTimingToData(currentDay[i][1])
                        gapHeight = timingToNum(addToTiming(startTime2, durationH2)) - timingToNum(startTime1)
                    } else if (isNaN(time1)) {
                        const startTime = errorTimingToData(currentDay[i][1])[2]
                        gapHeight = timingToNum(startTime) - time2/60
                    } else if (isNaN(time2)) {
                        const [durationH, _, startTime, _1] = errorTimingToData(currentDay[i-1][1])
                        gapHeight = (time1/60) - timingToNum(addToTiming(startTime, durationH*60))
                    }
                    currentDay.splice(i, 0, ["", gap, gapHeight, errorTimingToData(currentDay[i][1])[1]])
                } else {
                    currentDay.splice(i, 0, ["", gap, (time1 - time2)/60])
                }
            }
        }
        days[day] = currentDay
    }

    // Add Gap at non 8:00AM start
    for(let day of Object.keys(days)) {
        if (days[day][0] && days[day][0][1].substring(0,7) !== "08:00AM") {
            days[day].unshift(["", "", (timingToNum(errorTimingToData(days[day][0][1])[2])-timingToNum("08:00AM"))])
        }
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
            days[classInfo[0]].push([course, classInfo[1], timingToNum(classInfo[1].substring(11,19)) - timingToNum(classInfo[1].substring(0,7)), classInfo[2]])
        }
    }

    // Sort by time
    for(let day of Object.keys(days)) {
        days[day].sort((a,b) => a[1].length > 30 ? timingToNum(a[1].substring(a[1].length-19,a[1].length-12)) - timingToNum(b[1].substring(0,7)) : b[1].length > 30 ? timingToNum(a[1].substring(0,7)) - timingToNum(b[1].substring(b[1].length-19,b[1].length-12)) : timingToNum(a[1].substring(0,7)) - timingToNum(b[1].substring(0,7)))
    }
    // Add Breaks
    for(let day of Object.keys(days)) { 
        const currentDay = days[day]
        for(let i = 0; i < currentDay.length; i++) {
            if (i % 2) {
                const time1 = timingToNum(currentDay[i][1].substring(0,7)) * 60
                const time2 = timingToNum(currentDay[i-1][1].substring(11)) * 60  
                const gap = breakCalculator(time1 - time2)
                if (gap === "Unknown Break Time") {
                    let gapHeight;
                    if (isNaN(time1) && isNaN(time2)) {
                        const startTime1 = errorTimingToData(currentDay[i-1][1])[2]
                        const [durationH2, _2, startTime2, _4] = errorTimingToData(currentDay[i][1])
                        gapHeight = timingToNum(addToTiming(startTime2, durationH2)) - timingToNum(startTime1)
                    } else if (isNaN(time1)) {
                        const startTime = errorTimingToData(currentDay[i][1])[2]
                        gapHeight = timingToNum(startTime) - time2/60
                    } else if (isNaN(time2)) {
                        const [durationH, _, startTime, _1] = errorTimingToData(currentDay[i-1][1])
                        gapHeight = (time1/60) - timingToNum(addToTiming(startTime, durationH*60))
                    }
                    currentDay.splice(i, 0, ["", gap, gapHeight, errorTimingToData(currentDay[i][1])[1]])
                } else {
                    currentDay.splice(i, 0, ["", gap, (time1 - time2)/60])
                }
            }
        }
        days[day] = currentDay
    }

    // Add Gap at non 8:00AM start
    for(let day of Object.keys(days)) {
        if (days[day][0] && days[day][0][1].substring(0,7) !== "08:00AM") {
            days[day].unshift(["", "", (timingToNum(errorTimingToData(days[day][0][1])[2])-timingToNum("08:00AM"))])
        }
    }

    return days
}

console.log(extractScheduleStudent(studentDemoData))