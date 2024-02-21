import { useState } from "react"
import { extractSchedule } from "../scheduleConverter"

function App() {

  const [val, setVal] = useState("")

  const [data, setData] = useState(extractSchedule(""))

  const handleClick = () => {
    setData(extractSchedule(val))
  }

  return (
    <>
      <h1>Enter Your Ramdan Schedule</h1>
      <div className="input-holder">
        <textarea placeholder="Paste your schedule here..." value={val} onChange={e => setVal(e.target.value)}></textarea>
        <button onClick={handleClick}>Generate</button>
      </div>
      <div className="schedule-container">
        <h1>Your Ramdan Schedule:</h1>
        <div className="schedule">
          {Object.keys(data).map(day => (
            <div className="day-container">
              <h2 className="day">{day}</h2>
              <div className="day-courses">
                {data[day].map(course => (
                  <div className="course">
                    <h3 className="course-name">{course[0]}</h3>
                    <p className="course-timing">{course[1]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App