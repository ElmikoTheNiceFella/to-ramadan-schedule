import { useState, useRef, useEffect } from "react"
import { extractSchedule } from "../scheduleConverter"
import { ramadanStarts } from "../constants"
import { usePDF } from "react-to-pdf"
import Schedule from "./Schedule"

function App() {

  const [val, setVal] = useState("")

  const [data, setData] = useState(extractSchedule(""))

  const [canDownload, setCanDownload] = useState(false)

  useEffect(() => { 
    setCanDownload(false)
  }, [])

  const handleClick = () => {
    setData(extractSchedule(val))
    setCanDownload(true)
  }

  const {toPDF, targetRef} = usePDF({filename: 'ramdan-schedule.pdf'})

  // const handleDownload = () => {
  //   var element = document.getElementById('schedule')
  //   html2pdf(element);
  // }

  return (
    <>
      <h1>Enter Your Ramadan Schedule</h1>
      <div className="input-holder">
        <textarea placeholder="Paste your schedule here..." value={val} onChange={e => setVal(e.target.value)}></textarea>
        <button onClick={handleClick}>Generate</button>
        {canDownload && <button onClick={() => toPDF()}>Download PDF</button>}
      </div>
      <div ref={targetRef}>
        <h1>Your Ramadan Schedule:</h1>
        <div id="schedule" className="schedule-container">
          {/* {Object.keys(ramadanStarts).map((time) => (
            <p>{time}</p>
          ))} */}
          <Schedule data={data} />
        </div>
      </div>
    </>
  )
}

export default App