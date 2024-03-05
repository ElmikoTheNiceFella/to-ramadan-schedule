import { useState, useRef, useEffect } from "react"
import { extractScheduleStudent } from "../scheduleConverter"
import ReactToPrint from "react-to-print"
import Schedule from "./Schedule"
import Steps from "./Steps"

function App() {

  const [val, setVal] = useState("")

  const [data, setData] = useState(extractScheduleStudent(""))

  const [canDownload, setCanDownload] = useState(false)

  const [tutorial, setTutorial] = useState(false)

  useEffect(() => {
    setCanDownload(false)
  }, [])

  const handleClick = () => {
    setData(extractScheduleStudent(val))
    setCanDownload(true)
  }

  let schedule = useRef();

  const handleSteps = () => setTutorial(t => !t)

  return (
    <div style={{
      height: tutorial ? "100dvh" :"auto",
      overflowY: "hidden"
    }} id="parent">
      {tutorial && <Steps exit={handleSteps} />}
      <h1>Enter Your Ramadan Schedule</h1>
      <div className="type">
        <input type="radio" name="student-instructor" id="student" />
        <label htmlFor="student">Student</label>
        <input type="radio" name="student-instructor" id="instructor" />
        <label htmlFor="instructor">Instructor</label>
      </div>
      <div className="input-holder">
        <textarea placeholder="Paste your schedule here..." value={val} onChange={e => setVal(e.target.value)}></textarea>
        <button onClick={handleSteps}>Tutorial</button>
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