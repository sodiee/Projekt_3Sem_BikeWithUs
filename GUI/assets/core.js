import { async } from "@firebase/util"

// ------------------ DRIVERS ------------------
export async function deleteDriver(driverID) {
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


  async function addDriver(driver) {
    const response = await fetch('/drivers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(driver),
    });

    if (response.status === 201) {
        window.location = '/drivers';
    } else {
        alert('Der skete en fejl.');
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

  async function addJourney(journey) {
    const response = await fetch('/journeys', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(journey),
    });

    if (response.status === 201) {
        window.location = '/journeys';
    } else {
        alert('Der skete en fejl.');
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


//------------------ CUSTOMERS -------------------
async function deleteCustomer(customerID) {
    const response = await fetch(`/customers/${customerID}`,{
      method: 'DELETE'
    })
    if (response.status == 204) {
      window.location = "/customers"
    } else {
      alert("Der skete en fejl.")
    }
  }


async function editCustomer(customerID) {
    const firstName = document.getElementById('firstName').value 
    const lastName = document.getElementById('lastName').value
    let data = {firstName: firstName, lastName: lastName}
    let url = `/customers/${driverID}`
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    if(response.status == 200){
      window.location = '/customers'
    } else {
      alert("Der skete en fejl.")
    }
  }


  async function addCustomer(customer) {
    const response = await fetch('/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
    });

    if (response.status === 201) {
        window.location = '/customers';
    } else {
        alert('Der skete en fejl.');
    }
}
//------------------ ADMINS -------------------
async function deleteAdmin(adminID) {
    const response = await fetch(`/admins/${adminID}`,{
      method: 'DELETE'
    })
    if (response.status == 204) {
      window.location = "/admins"
    } else {
      alert("Der skete en fejl.")
    }
  }


async function editAdmin(adminID) {
    const firstName = document.getElementById('firstName').value 
    const lastName = document.getElementById('lastName').value
    let data = {firstName: firstName, lastName: lastName}
    let url = `/admins/${adminID}`
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    if(response.status == 200){
      window.location = '/admins'
    } else {
      alert("Der skete en fejl.")
    }
  }


async function addAdmin(admin) {
    const response = await fetch('/admins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(admin),
    });

    if (response.status === 201) {
        window.location = '/admins';
    } else {
        alert('Der skete en fejl.');
    }
}  

