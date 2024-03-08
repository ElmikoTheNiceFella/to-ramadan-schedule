import { timingToNum, errorTimingToData } from "../functions"

const base = timingToNum("08:00AM")

const Schedule = ({ data }) => {
  
  return (
    <div style={{
      height: "1000px"
    }} className="schedule">
      {Object.keys(data).map((day, k) => (
        <div key={day} className="day-container">
          {/* Days */}
          <h2 style={{
            height: "40px"
          }} className="day">{day}</h2>
          {/* Courses */}
          <div style={{
            position: "relative"
          }} className="day-courses">
            {/* Oh boy please dont judge the code below */}
            {data[day].map((course, i) => (
              <div key={i} style={{
                position: "absolute",
                top: course[0] ? (course[1].length > 30 ? (timingToNum(errorTimingToData(course[1])[2]) - base) * 100 : (timingToNum(course[1].substring(0, 7)) - base) * 100) : course[1] ? (course[1] == "Unknown Break Time" ? (timingToNum(errorTimingToData(data[day][i - 1][1])[3]) - base) * 100 : (timingToNum(data[day][i - 1][1].substring(11, 19)) - base) * 100) : 0,
                height: `${course[2] * 100}px`,
                backgroundColor: course[1] && !course[0] && course[2] * 60 < 15 ? "#0055b8" : !course[0] && !course[1] ? "#efefee" : !course[0] ? "#efefee" : "#0055b8",
                borderTop: i == 0 ? "2px solid #5bc0de" : "",
                borderBottom: i == data[day].length - 1 ? "2px solid #5bc0de" : "",
                borderLeft: k == 0 ? "2px solid #5bc0de" : "",
                borderRight: k == Object.keys(data).length - 1 ? "2px solid #5bc0de" : "",
              }} className={`course${!course[0] ? " break" : ""}`}>
                {/* Course Name */}
                <h3 className="course-name">{course[0]}</h3>
                {/* Room Number */}
                {course[0] && <p className="room-number">{course[3]}</p>}
                {/* Course Timing */}
                <p className="course-timing">{course[1] && !course[0] && course[2] * 60 < 15 ? "" : course[1]}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// const Schedule = ({ data }) => {
//   // Generate a times array from 08:00AM to 07:00PM
//   const times = ["08:00AM", "09:00AM", "10:00AM", "11:00AM", "12:00PM", "01:00PM", "02:00PM", "03:00PM", "04:00PM", "05:00PM", "06:00PM", "07:00PM"]

//   return (
//     <div className="schedule">
//       {Object.keys(data).map(day => (
//         <div className="day-container">
//           {/* Days */}
//           <h2 className="day">{day}</h2>
//           {/* Courses */}
//           <div className="day-courses">
//             {data[day].map(course => (
//               <div className="course">
//                 {/* Course Name */}
//                 <h3 className="course-name">{course[0]}</h3>
//                 {/* Course Timing */}
//                 <p className="course-timing">{course[1]}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

export default Schedule