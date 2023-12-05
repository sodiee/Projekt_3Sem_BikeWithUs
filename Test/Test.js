
import Booking from '../Controller/Model/Booking.js';
import DBFunctions from '../Storage/DBFunctions.js';
import chai from 'chai'
const assert = chai.assert
https://www.chaijs.com/api/assert/


//DBFUNCTIONS TEST 
describe('Crud test på Booking', () => {
  let customer;
  let booking;
  let journey;
  let startDate;
  let endDate;
  let name = "Cykeltur gennem klitterne";
  let nrOfDays = 4;


    beforeEach(async() => {
     startDate = new Date("2023-11-24")
     endDate = new Date("2023-11-28")
      

     journey = { name: "Håber det virker", nrOfDays: 4, price: 4300}//"Det bliver en god tur"}
     customer = { firstName: "Mewkel", lastName: "Lindhøøøøøj", birthday: "160795", city: "Frederiksbjerg", bookings: [] };
     booking = {customer,journey, nrOfPersons: 2, startDate: startDate, endDate: Booking.addDays(startDate, nrOfDays)}
    
     booking = await DBFunctions.addBookingDB(booking);

    }
    );

    
    
    it('Should return a booking', async () => {
        const result = await DBFunctions.getBookingDB(booking.id);
        assert.isObject(result, "Should return a booking id");
      }
    );

    it('should edit a bookings start date', async () => {
      
      let newDate = new Date('Wed Dec 09 2020 00:00:00 GMT+0100 (Central European Standard Time)');
      let endDate = new Date('Sun Dec 13 2020 00:00:00 GMT+0100 (Central European Standard Time)');

      booking.startDate = newDate;
      booking.endDate = endDate;

      await DBFunctions.editStartDateDB(booking)

    
      const updatedBooking = await DBFunctions.getBookingDB(booking.id);
      let result = updatedBooking.startDate.toString();
      console.log(result);

      assert.strictEqual(newDate,result, 'Booking start date should be edited');
  })

  it('should add a addon to a booking', async () => {
    const addon = { name: 'Test Addon', price: 100 };
  
    await DBFunctions.addAddonsToBookingDB(booking, addon);
  
    const updatedBooking = await DBFunctions.getBookingDB(booking.id);
  
    assert.include(updatedBooking.addons[0], addon, 'Addons should be added to the booking');
  });
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
});



// FETCH TEST
/** 
//--delete driver--
import { deleteDriver } from '../GUI/assets/core.js'; // fetch function path

describe('it should delete a driver', () => {
    it('should delete a driver', async () => {
        const driverID = '33h3J1C0yvUhtiEUrmcd'; // driver ID
        const response = await deleteDriver(driverID);
        assert.strictEqual(response.status, 200, 'Driver should be deleted');
    });
});


//--add driver--
import { addDriver } from '../GUI/assets/core.js'; // fetch function path

describe('addDriver', () => {
    it('should add a driver', async () => {
        const driver = {
            firstName: 'Test',
            lastName: 'Driver',
        };
        const response = await addDriver(driver);
        assert.strictEqual(response.status, 201, 'Driver should be added');
    });
});
**/