import { async } from "@firebase/util"

// ------------------ DRIVERS ------------------
async function deleteDriver(driverID) {
    const response = await fetch(`/drivers/${driverID}`,{
      method: 'DELETE'
    })
    if (response.status == 204) {
      window.location = "/drivers"
    } else {
      alert("Der skete en fejl.")
    }
  }


async function editDriver(driverID) {
    const firstName = document.getElementById('firstName').value 
    const lastName = document.getElementById('lastName').value
    let data = {firstName: firstName, lastName: lastName}
    let url = `/drivers/${driverID}`
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    if(response.status == 200){
      window.location = '/drivers'
    } else {
      alert("Der skete en fejl.")
    }
  }

  //------------------ JOURNEYS -------------------
  async function deleteJourney(journeyID) {
    const response = await fetch(`/journeys/${journeyID}`,{
      method: 'DELETE'
    })
    if (response.status == 204) {
      window.location = "/journeys"
    } else {
      alert("Der skete en fejl.")
    }
  }

async function editJourney(journeyID) {
    const startDate = document.getElementById('startDate').value 
    const endDate = document.getElementById('endDate').value
    const price = document.getElementById('price').value
    let data = {startDate: startDate, endDate: endDate, price: price}
    let url = `/journeys/${journeyID}`
    const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
    })
    if(response.status == 200){
    window.location = '/journeys'
    } else {
    alert("Der skete en fejl.")
    }
}