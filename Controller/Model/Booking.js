import DBFunctions from '../../Storage/DBFunctions.js';

function Booking(customer, journey,nrOfPersons, startdate) {
  this.customer = customer;
  this.journey = journey;
  this.startdate = startdate;
  this.endDate = this.startdate + journey.nrOfDays;
  this.tilvalg = [];
  this.nrOfPersons = nrOfPersons;
  this.bookingDate = new Date();
  this.bookingPrice = journey.price * nrOfPersons;
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
    let j = {name: booking.name, startDate: booking.startDate, endDate: startDate + booking.nrOfDays}
    return DBFunctions.editStartDateDB(j);
}

async function getBooking(booking) {
    return await DBFunctions.getBookingDB(booking);
}

async function getBookings() {
    console.log('3')
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
    console.log('2')
    let arr = await getBookings();
    console.log('6')
    arr = filterByMonth(arr, month)
    console.log('10')
    return arr;
}

function filterByMonth(monthArray, targetMonth) {
    console.log('7')
    let res = [];
    console.log('8')
    for (let i = 0; i < monthArray.length; i++) {
        
        let date = new Date(monthArray[i].startdate); 
       
        if (date.getMonth() + 1 == targetMonth) {
            console.log(monthArray[i])
            res.push(monthArray[i]);
        }
    }
    console.log('9')
    return res;
}

export default {getBooking, getBookings, addBooking, deleteBooking, editBooking, addTilvalg, editStartDate, getBookingsByMonth}