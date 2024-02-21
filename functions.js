import { ramadanStarts, ramadanTimings } from "./constants.js";

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
    let suffix = hours >= 12 ? "PM" : "AM"

    // Format hours if minutes exceeds 60
    if (hours > 12) hours -= 12

    // Format hours and minutes
    let endTiming = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + suffix

    return endTiming
}

function timingToNum(timing) {
    let hours = +timing.substring(0, 2);
    let minutes = +timing.substring(3, 5) / 60;
    
    if (timing.substring(5, 7) == "PM" && hours != 12) hours += 12

    return hours+minutes
}

function timingToRamdan(timing) {
    // Get timing start
    let timings = timing.split(" to ") // 8:00AM to 11:00AM => ['8:00AM', '11:00AM']
    timings = timings.map(v => v.padStart(7, '0')) // 8:00AM => 08:00AM & 11:00AM => 11:00AM

    let start = ramadanStarts[timings[0]]

    // Calculate the duration
    let duration = timingToNum(timings[1]) - timingToNum(timings[0])

    let ramadanDuration = ramadanTimings[duration*60]

    // Get timing end
    let end = addToTiming(start, ramadanDuration)

    return `${start} to ${end}`
}

/* ------------------------ */
/* Main conversion function */
/* ------------------------ */

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