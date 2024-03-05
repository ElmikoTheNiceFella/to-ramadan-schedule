import { timingToNum } from "../functions"

const base = timingToNum("08:00AM")

const Schedule = ({data}) => {
  // Generate a times array from 08:00AM to 07:00PM
  const times = ["08:00AM", "09:00AM", "10:00AM", "11:00AM", "12:00PM", "01:00PM", "02:00PM", "03:00PM", "04:00PM", "05:00PM", "06:00PM", "07:00PM"]
  if (data["Monday"].length !== 0)
    console.log((timingToNum(data["Monday"][0][1].substring(0, 7)) - base) * 200)
  return (
    <div style={{
      height: "100vh"
    }} className="schedule">
      {Object.keys(data).map(day => (
        <div key={day} style={{ position: "relative" }} className="day-container">
          {/* Days */}
          <h2 className="day">{day}</h2>
          {/* Courses */}
          <div className="day-courses">
            {data[day].map((course, i) => (
              <div key={i}className={`course${!course[0] ? " break" : ""}`}>
                {/* Course Name */}
                <h3 className="course-name">{course[0]}</h3>
                {/* Course Timing */}
                <p className="course-timing">{course[1]}</p>
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