import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"

const firebaseConfig = {
    databaseURL : "https://practice-2cfeb-default-rtdb.firebaseio.com"
  }

  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app)
  const referenceInDB = ref(database, "unit")


const mainInput = document.getElementById("main-input")
const lengthP = document.getElementById("length-p")
const volumeP = document.getElementById("volume-p")
const massP = document.getElementById("mass-p")
const convertBtn = document.getElementById("convert-btn")
const clearBtn = document.getElementById("clear-btn")
let meter = 3.281
let liter = 0.264
let kilogram = 2.204

onValue(referenceInDB, function(snapshot) {
    const doesSnapshotExists = snapshot.exists()

    if (doesSnapshotExists) {
        const snapshotValue = snapshot.val()
        const units = Object.values(snapshotValue)
        console.log("Units from DB:", units)
    }
})

convertBtn.addEventListener("click", function() {

    const inputValue = parseFloat(mainInput.value);
    
    if (!isNaN(inputValue)) {
        push(referenceInDB, inputValue)

        lengthP.innerHTML = `${inputValue} meters = ${(inputValue * meter).toFixed(3)} feet |
        ${inputValue} feet = ${(inputValue / meter).toFixed(3)} meter`

        volumeP.innerHTML = `${inputValue} liters = ${(inputValue * liter).toFixed(3)} gallons |
        ${inputValue} gallons = ${(inputValue / liter).toFixed(3)} litres`

        massP.innerHTML = `${inputValue} kilos = ${(inputValue * kilogram).toFixed(3)} pounds |
        ${inputValue} pounds = ${(inputValue / kilogram).toFixed(3)} kilos`

    } else {
        lengthP.textContent = "invalid input"
        volumeP.textContent = "invalid input"
        massP.textContent = "invalid input"
    }
    
})

clearBtn.addEventListener("click", function(){
    mainInput.value = ""
    remove(referenceInDB)
})
