import { useState } from "react"
import { extractSchedule } from "../scheduleConverter"
import Schedule from "./Schedule"

function App() {

  const [val, setVal] = useState("")

  const [data, setData] = useState(extractSchedule(""))

  const handleClick = () => {
    setData(extractSchedule(val))
  }

  return (
    <>
      <h1>Enter Your Ramadan Schedule</h1>
      <div className="input-holder">
        <textarea placeholder="Paste your schedule here..." value={val} onChange={e => setVal(e.target.value)}></textarea>
        <button onClick={handleClick}>Generate</button>
      </div>
      <h1>Your Ramadan Schedule:</h1>
      <div className="schedule-container">
        
        <Schedule data={data} />
      </div>
    </>
  )
}

export default App