import DBFunctions from '../Storage/DBFunctions.js';
import chai from 'chai'
const assert = chai.assert
//https://www.chaijs.com/api/assert/

//DBFUNCTIONS TEST 
describe('Crud test på Journey', () => {
  let customer;
  let journey;
  let name = "Cykeltur gennem klitterne";
  let startDate = "2023-11-24"//new Date(1998, 8, 25)
  let endDate = "2023-11-28"//new Date(startDate)
  //endDate.setUTCDate(endDate.getUTCDate() + 3);

    beforeEach(async() => {
      startDate = "2023-11-24" //new Date(1998, 8, 25)
      endDate = "2023-11-28" //new Date(startDate)
      //endDate.setUTCDate(endDate.getUTCDate() + 3);

     customer = { firstName: "Mewkel", lastName: "Lindhøøøøøj", birthday: "160795", city: "Frederiksbjerg" };
     journey = {name, customer, startDate, endDate, price: 4300};
    
     journey = await DBFunctions.addJourneyDB(journey, customer);

    }
    );


    
    it('Should return a journey', async () => {
        const result = await DBFunctions.getJourneyDB(journey.id);
        assert.isObject(result, "Should return a journey id");
      }
    );

    it('should edit a journeys start date', async () => {
      
      let newDate = '2023-12-05';
      const endDate = "2023-12-09" //new Date(newDate)
      //endDate.setUTCDate(endDate.getUTCDate() + 3);

      await DBFunctions.editStartDateDB(journey,newDate, endDate)

      const updatedJourney = await DBFunctions.getJourneyDB(journey.id);

      assert.strictEqual(newDate,updatedJourney.startDate, 'Journey start date should be edited');
  })


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