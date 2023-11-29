function booking(customer, journey,antalPersoner, startdate) {
  this.customer = customer;
  this.journey = journey;
  this.startdate = startdate;
  this.endDate = this.startdate + journey.antalDage;
  this.tilvalg = [];
  this.antalPersoner = antalPersoner;
  this.bookingDate = new Date();
  this.bookingPrice = journey.price * antalPersoner;
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
    let j = {name: booking.name, startDate: booking.startDate, endDate: startDate + booking.antalDage}
    return DBFunctions.editStartDateDB(j);
}

async function getBooking(booking) {
    return await DBFunctions.getBookingDB(booking);
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

export default {getBooking, getBookings, addBooking, deleteBooking, editBooking, addTilvalg, editStartDate}