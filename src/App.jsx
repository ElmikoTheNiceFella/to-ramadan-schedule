import { useState, useRef, useEffect } from "react"
import { extractScheduleStudent, extractScheduleInstructor } from "../scheduleConverter"
import ReactToPrint from "react-to-print"
import Schedule from "./Schedule"
import Steps from "./Steps"
import { instructorDemoData, studentDemoData } from "../constants"

function App() {

  const [val, setVal] = useState("")

  const [data, setData] = useState(extractScheduleStudent(""))

  const [isStudent, setIsStudent] = useState(true);

  const [canDownload, setCanDownload] = useState(false)

  const [tutorial, setTutorial] = useState(false)

  useEffect(() => {
    setCanDownload(false)
  }, [])

  const handleClick = () => {
    if (isStudent) {
      setData(extractScheduleStudent(val))
    } else {
      setData(extractScheduleInstructor(val))
    }
    setCanDownload(true)
  }

  let schedule = useRef();

  const handleSteps = () => setTutorial(t => !t)

  const handleDemoData = () => {
    setVal(isStudent ? studentDemoData : instructorDemoData)
  }

  return (
    <div style={{
      height: tutorial ? "100dvh" :"auto",
      overflowY: "hidden"
    }} id="parent">
      {tutorial && <Steps exit={handleSteps} isInstructor={!isStudent} />}
      <h1>Enter Your Ramadan Schedule</h1>
      <p style={{ textAlign: "center", marginBottom: "32px", padding: "0px 24px" }} >Don't forget to donate and/or make du'a for our brothers and sisters who are facing hardships during this holy month in Palestine, Sudan, or wherever they may be.</p>
      <div className="type">
        <input type="radio" checked={isStudent} onChange={() => setIsStudent(p => !p)} name="student-instructor" id="student" />
        <label htmlFor="student">Student</label>
        <input type="radio" checked={!isStudent} onChange={() => setIsStudent(p => !p)} name="student-instructor" id="instructor" />
        <label htmlFor="instructor">Instructor</label>
      </div>
      <div className="input-holder">
        <textarea placeholder="Paste your schedule here..." value={val} onChange={e => setVal(e.target.value)}></textarea>
        <button onClick={handleSteps}>Tutorial</button>
        <button onClick={handleDemoData}>Demo data (for recruiters)</button>
        <button onClick={handleClick}>Generate</button>
        {canDownload &&
          <ReactToPrint
            trigger={() => <button onClick={() => toPDF()}>Print PDF</button>}
            content={() => schedule}
          />
        }
      </div>
      <div id="schedule-to-print" ref={(el) => (schedule = el)}>
        <h1>Your Ramadan Schedule:</h1>
        <div id="schedule" className="schedule-container">
          <Schedule data={data} />
        </div>
      </div>
    </div>
  )
}

export default App