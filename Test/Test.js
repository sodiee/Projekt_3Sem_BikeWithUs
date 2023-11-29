
import Booking from '../Controller/Model/Booking.js';
import DBFunctions from '../Storage/DBFunctions.js';
import chai from 'chai'
const assert = chai.assert
//https://www.chaijs.com/api/assert/

//DBFUNCTIONS TEST 
describe('Crud test på Booking', () => {
  let customer;
  let booking;
  let journey;
  let name = "Cykeltur gennem klitterne";
  let startDate = "2023-11-24"//new Date(1998, 8, 25)
  let endDate = "2023-11-28"//new Date(startDate)
  let nrOfDays = 4;
  //endDate.setUTCDate(endDate.getUTCDate() + 3);

    beforeEach(async() => {
      startDate = "2023-11-24" //new Date(1998, 8, 25)
      endDate = "2023-11-28" //new Date(startDate)
      //endDate.setUTCDate(endDate.getUTCDate() + 3);

     journey = { name: "Håber det virker", nrOfDays: 4, price: 4300}
     customer = { firstName: "Mewkel", lastName: "Lindhøøøøøj", birthday: "160795", city: "Frederiksbjerg", bookings: [] };
     booking = {customer,journey, nrOfPersons: 2, startDate: startDate}
    
     booking = await DBFunctions.addBookingDB(booking, customer);

    }
    );

    
    
    it('Should return a booking', async () => {
        const result = await DBFunctions.getBookingDB(booking.id);
        assert.isObject(result, "Should return a booking id");
      }
    );

    it('should edit a bookings start date', async () => {
      
      let newDate = '2023-12-06';
      const endDate = "2023-12-09" //new Date(newDate)
      //endDate.setUTCDate(endDate.getUTCDate() + 3);

      await DBFunctions.editStartDateDB(booking,newDate, endDate)

      const updatedBooking = await DBFunctions.getBookingDB(booking.id);

      assert.strictEqual(newDate,updatedBooking.startDate, 'Booking start date should be edited');
  })

  it('should add a tilvalg to a booking', async () => {
    const tilvalg = { name: 'Test Tilvalg', price: 100 };
  
    await DBFunctions.addTilvalgToBookingDB(booking, tilvalg);
  
    const updatedBooking = await DBFunctions.getBookingDB(booking.id);
  
    assert.include(updatedBooking.tilvalg[0], tilvalg, 'Tilvalg should be added to the booking');
  });




//DBFunctions-script test
describe('CRUD test på Customer', () => {
    let customer
    let addedCustomerId;

    beforeEach(() => {
        customer = { firstName: "Mewkel", lastName: "Lindhøøøøøj", birthday: "160795", city: "Frederiksbjerg" };
    })

    // An after each to delete the object from the databse after each test
    afterEach(async () => {
        if (addedCustomerId) {
            await DBFunctions.deleteCustomerDB(customer);
        }
    })

                
        it('should add a customer', async () => {
            addedCustomerId = customer.id

        assert.isNotNull(addedCustomerId, 'The customers ID must not be null')
    })


    it('should delete a customer', async () => {
        let customerToDelete = await DBFunctions.addCustomerDB(customer);
        customerToDelete = DBFunctions.deleteCustomerDB(customerToDelete)


        assert.isUndefined(customerToDelete.id, 'Customer should be removed')
    })


    it('should return a customer', async () => {
        customer = await DBFunctions.addCustomerDB(customer);
        let customerG = await DBFunctions.getCustomerDB(customer.id);

        assert.notStrictEqual(customerG, null, 'Customer should exist');
    })

    it('should edit a customer', async () => {
        let newCustomer = await DBFunctions.addCustomerDB(customer);
        newCustomer.fornavn = 'NyFornavn';


        await DBFunctions.editCustomerDB(customer)
        assert.strictEqual(newCustomer.fornavn, 'NyFornavn', 'Customer should be edited');
        });
    })  
})