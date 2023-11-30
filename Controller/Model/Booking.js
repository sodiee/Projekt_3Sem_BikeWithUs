import DBFunctions from '../../Storage/DBFunctions.js';

function Booking(customer, journey, nrOfPersons, startDate) {
    this.customer = customer;
    this.journey = journey;
    this.startDate = startDate;
    this.endDate = addDays(startDate, journey.nrOfDays);
    this.tilvalg = [];
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

  for (let i = 0; i < this.tilvalg.length; i++) {
    price += this.tilvalg[i].price;
  }

  return price;
};
*/

function addTilvalg(tilvalg) {
    DBFunctions.addTilvalgToBookingDB(tilvalg);
}

async function editStartDate(booking) {
    let j = { name: booking.name, startDate: booking.startDate, endDate: addDays(booking.startDate, booking.nrOfDays) }
    return DBFunctions.editStartDateDB(j);
}

async function getBooking(booking) {
    console.log('2')
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
        let date = new Date(monthArray[i].startDate);
        if (date.getMonth() + 1 == targetMonth) {
            res.push(monthArray[i]);
        }
    }
    return res;
}

export default { addDays, getBooking, getBookings, addBooking, deleteBooking, editBooking, addTilvalg, editStartDate, getBookingsByMonth }