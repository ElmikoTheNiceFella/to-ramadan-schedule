import { ramadanStarts, ramadanTimings, fullDays, studentDemoData, instructorDemoData } from "./constants.js";

export function addToTiming(timing, duration) {
    // Get duration as hours and minutes
    const durationHours = Math.floor(duration / 60)
    const durationMinutes = duration % 60

    // Get timing as hours and minutes
    const timingHours = +timing.substring(0, 2)
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
    let timings = timing.split(/\sto\s|\s\-\s/) // 8:00AM to 11:00AM => ['8:00AM', '11:00AM']
    if (timings[0].length <= 5) {
        timings = timings.map(v => convertToAMPM(v))
    } else {
        timings = timings.map(v => v.padStart(7, '0')) // 8:00AM => 08:00AM & 11:00AM => 11:00AM
    }

    let start = ramadanStarts[timings[0]]

    // Calculate the duration
    let duration = timingToNum(timings[1]) - timingToNum(timings[0])

    let ramadanDuration = ramadanTimings[duration*60]

    // Get timing end
    if (start === undefined) {
        for(let i = 0; i < Object.keys(ramadanStarts).length; i++) {
            if ( timingToNum(timings[0]) < timingToNum(Object.keys(ramadanStarts)[i+1]) && timingToNum(timings[0]) > timingToNum(Object.keys(ramadanStarts)[i]) ) {
                start = `Between ${ramadanStarts[Object.keys(ramadanStarts)[i]]} and ${ramadanStarts[Object.keys(ramadanStarts)[i+1]]}`
                break
            }
        }
        return `${breakCalculator(ramadanDuration).substring(0, breakCalculator(ramadanDuration).length - 6)} Class\n${start}`
    }
    let end = addToTiming(start, ramadanDuration)

    return `${start} to ${end}`
}

export function breakCalculator(time) {
    let hours = Math.floor(time / 60)
    let minutes = time % 60
    if (!hours && !minutes) return "Unknown Break Time"

    if (hours == 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""} break`
    } 
    else if (minutes == 0) {
        return `${hours} hour${hours > 1 ? "s" : ""} break`
    }
    else {
        return `${hours} hour${hours > 1 ? "s" : ""} and ${minutes} minute${minutes > 1 ? "s" : ""} break`
    }
    
}

/* ----------------------------- */
/* Main data extraction function */
/* ----------------------------- */

export function analyzeData(data) {
    const lines = data.split("\n")
    
    let finalStuff = []
    console.log(data)
    let i = -1;
    let course = "";
    for(let line of lines) {
        if (/([A-Z]{4}\s[0-9]{4})/.test(line) || line.startsWith("LAB")) {
            if (line.startsWith("LAB")) {
                course = course.substring(0, course.length-5) + "- LAB"
            } else {
                course = line.match(/([A-Z]{4}\s[0-9]{4})/)[0] + " - LEC"
            }
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
            if (/[0-9]{2}\.[0-9]\.[0-9]{2}/.test(line)) {
                console.log("Found room number", finalStuff[i].timings)
                for(let j = 0; j <  finalStuff[i].timings.length; j++) {
                    if (finalStuff[i].timings[j].includes(" to ") || finalStuff[i].timings[j].includes("Between")) {
                        finalStuff[i].timings[j] = [finalStuff[i].timings[j], line]
                    }
                }
            }
        }
    }

    return finalStuff
}

export function analyzeInstructorData(data) {
    const lines = data.split("\n")
    let courseData = []
    let courseName = ""
    let finalData = {}
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (/[A-Z]{4}\s[0-9]{4}/.test(line)) {
            if (courseName) finalData[courseName] = courseData
            courseName = line.match(/([A-Z]{4}\s[0-9]{4}\-[0-9]{0,2})/)[0]
            courseData = []
        }
        if (Object.keys(fullDays).includes(line.substring(0, 2))) {
            const day = fullDays[line.substring(0, 2)]
            const timing = timingToRamdan(line.substring(3, line.length))
            const roomNumber = lines[i+1]
            courseData.push([day, timing, roomNumber])
        }
    }
    return finalData
}

export function errorTimingToData(timing) {
    if (timing.length < 40) return [0,0,0,timing.substring(11)]
    let hours, minutes;
    
    if (timing.length > 46) {
        hours = +timing.match(/.*(?=(hour))/ig)[0]
        minutes = +timing.match(/(?<=(and)).*(?=(minute))/ig)[0]
    } else {
        hours = timing.includes("hour") ? +timing.match(/.*(?=(hour))/ig)[0] : false
        minutes = timing.includes("minute") ? +timing.match(/.*(?=(minute))/ig)[0] : false
    }

    const duration = hours ? hours * 60 + (minutes ? minutes : 0) : minutes ? minutes : false

    const estim1 = timing.substring(timing.length-19, timing.length-12)
    const estim2 = timing.substring(timing.length-7, timing.length)

    const estimatedAverage = addToTiming(estim1, Math.round((timingToNum(estim2)*60 - timingToNum(estim1)*60)/2))
    const estimatedStartTime = timingToNum(estim2) - timingToNum(estimatedAverage)

    const start = addToTiming(estimatedAverage, duration)

    return [duration/60, estimatedStartTime, estimatedAverage, start]
}

console.log(analyzeData(studentDemoData))
console.log("------------------------------------------------")
console.log(analyzeInstructorData(instructorDemoData))