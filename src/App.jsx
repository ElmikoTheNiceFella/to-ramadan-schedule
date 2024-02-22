import { useState, useRef, useEffect } from "react"
import { extractSchedule } from "../scheduleConverter"
import { ramadanStarts } from "../constants"
import ReactToPrint from "react-to-print"
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

  let schedule = useRef();

  // const {toPDF, targetRef} = usePDF({filename: 'ramdan-schedule.pdf'})

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