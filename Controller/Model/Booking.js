import DBFunctions from '../../Storage/DBFunctions.js';

// Er tjekket for korrektur

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

/* 
booking.prototype.calculatePrice = function () {
  let price = this.journey.price;

  for (let i = 0; i < this.addons.length; i++) {
    price += this.addons[i].price;
  }

  return price;
};
*/

function addAddons(addons) {
    DBFunctions.addAddonsToBookingDB(addons);
}

async function editStartDate(booking, newStartDate, newEndDate) {
    let j = {id: booking.id, name: booking.name, startDate: newStartDate, endDate: newEndDate }
    return DBFunctions.editStartDateDB(j);
}

async function getBooking(booking) {
    return await DBFunctions.getBookingDB(booking.id);
}

async function getBookings() {
    return await DBFunctions.getBookingsDB();
}

async function addBooking(booking) {
    return await DBFunctions.addBookingDB(booking);
}

async function deleteBooking(booking) {
    return await DBFunctions.deleteBookingDB(booking);
}

async function editBooking(booking) {
    return await DBFunctions.editBookingDB(booking);
}
async function getBookingsByMonth(month) {
    let arr = await getBookings();

    
    arr = filterByMonth(arr, month)
    return arr;
}

function filterByMonth(monthArray, targetMonth) {
    let res = [];
    for (let i = 0; i < monthArray.length; i++) {
  
        if (monthArray[i].startDate.getMonth() + 1 == targetMonth) {
            res.push(monthArray[i]);
        }


        //startdato fra måned 10 kommer i 10. måned
        if (monthArray[i].startDate.getMonth() !== monthArray[i].endDate.getMonth()) {
            if (monthArray[i].startDate.getMonth() + 1 == targetMonth) {
                let b = {journey: { name: monthArray[i].journey.name } , startDate: monthArray[i].startDate, endDate: 31, customer: monthArray[i].customer, nrOfPersons: monthArray[i].nrOfPersons, addons: monthArray[i].addons}
                res.push(b);
            }
        //slutdato fra måned 11 kommer i 11. måned
            if (monthArray[i].endDate.getMonth() + 1 == targetMonth) {
                let b = {journey: { name: monthArray[i].journey.name } , startDate: 1, endDate: monthArray[i].endDate, customer: monthArray[i].customer, nrOfPersons: monthArray[i].nrOfPersons, addons: monthArray[i].addons}
                res.push(b);
            }
        }
    }
    return res;
}

async function getCustomerBookings(customerId) {
    return await DBFunctions.getCustomerBookingsDB(customerId);
}

async function getCustomerBooking(customerId) {
    return await DBFunctions.getCustomerBookingDB(customerId);
}

function calculateDays(month) {
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        return 31;
    } else if (month == 2) {
        return 28;
    } else {
        return 30;
    }
}

export default { addDays, getBooking, getBookings, addBooking, deleteBooking, editBooking, addAddons, editStartDate, getBookingsByMonth, getCustomerBookings, getCustomerBooking};  // Tilføj getCustomerBookings her