import { analyzeData } from "./scheduleConverter";

const userInput = document.getElementById("userInput")

const data = userInput.value

const displayElement = document.getElementById("display")

function displaySchedule() {
  displayElement.innerHTML = analyzeData(data)
}