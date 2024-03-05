import { ramadanStarts, ramadanTimings, fullDays } from "./constants.js";

function addToTiming(timing, duration) {
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
    
    let i = -1;
    for(let line of lines) {
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