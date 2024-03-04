import { ramadanStarts, ramadanTimings } from "./constants.js";

const tData = `
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
const sData = `
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
 
05.2.37`
function addToTiming(timing, duration) {
    // Get duration as hours and minutes
    const durationHours = Math.floor(duration / 60)
    const durationMinutes = duration % 60

    // Get timing as hours and minutes
    const timingHours = +timing.substring(0, 2)
    console.log(timingHours)
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

    console.log(timings)
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

/* ------------------------ */
/* Main conversion function */
/* ------------------------ */

export function analyzeData(data) {
    const lines = data.split("\n")
    
    let finalStuff = []
    
    let i = -1;
    for(let line of lines) {
        console.log(line)
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

function analyzeTacherData(data) {
    const lines = data.split("\n")
    let courseData = []
    let courseName = ""
    let finalData = {}
    for(let i = 0; i < lines.length; i++) {
        const line = lines[i]

        if (/[A-Z]{4}\s[0-9]{4}/.test(line)) {
            finalData[courseName] = courseData
            courseName = line.match(/([A-Z]{4}\s[0-9]{4})/)[0]
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

console.log(analyzeData(sData))
console.log(analyzeTacherData(tData))