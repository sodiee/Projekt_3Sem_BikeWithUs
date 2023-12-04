import DBFunctions from '../../Storage/DBFunctions.js';


// Er tjekket for korrektur
function Booking(customer, journey, nrOfPersons, startDate) {
    this.customer = customer;
    this.journey = journey;
    this.startDate = startDate;
    this.endDate = addDays(startDate, journey.nrOfDays);
    this.addons = [];
    this.nrOfPersons = nrOfPersons;
    this.bookingDate = new Date();
    this.bookingPrice = journey.price * nrOfPersons;
}

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
    }
    return res;
}

async function getCustomerBookings(customerId) {
    return await DBFunctions.getCustomerBookingsDB(customerId);
}

async function getCustomerBooking(customerId) {
    return await DBFunctions.getCustomerBookingDB(customerId);
}

export default { addDays, getBooking, getBookings, addBooking, deleteBooking, editBooking, addAddons, editStartDate, getBookingsByMonth, getCustomerBookings, getCustomerBooking};  // Tilføj getCustomerBookings her