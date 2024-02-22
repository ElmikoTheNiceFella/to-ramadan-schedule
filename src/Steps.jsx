import { useState } from "react";
import { step1, step2, step3, step4, step5, step6, step7, step8, step9 } from "./images";
const Steps = ({ exit }) => {

  const steps = [step1, step2, step3, step4, step5, step6, step7, step8, step9]

  const [index, setIndex] = useState(0)

  const handlePrevious = () => setIndex(i => i > 0 ? i - 1 : i)

  const handleNext = () => setIndex(i => i < steps.length - 1 ? i + 1 : i)

  return (
    <div onClick={exit} className="steps-container">
      <div onClick={e => e.stopPropagation()}>
        <img src={steps[index]} alt="" />
        <div className="steps-control">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Steps;
