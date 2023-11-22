import DBFunctions from '../Storage/DBFunctions.js';
import chai from 'chai'
const assert = chai.assert

//DBFUNCTIONS TEST 

describe('Crud test på Journey', () => {
  let customer;
  let journey;
  beforeEach(() => {
     customer = { firstName: "Mewkel", lastName: "Lindhøøøøøj", birthday: "160795", city: "Frederiksbjerg" };
     journey = {customer: customer, startDate: "092598", price: 5000};
  })
    
  it('Should return a journey', async () => {
      const result = await DBFunctions.getJourneyDB(journey);
      assert.deepStrictEqual(result, journey);
    });

    it('should edit a journeys start date', async () => {

      let newJourney = await DBFunctions.addJourneyDB(journey, journey.customer);
      
      let newDate = '2024-05-05';
      await newJourney.DBFunctions.editStartDateDB(newDate)

      assert.strictEqual(newJourney.startDate, '2024-05-05', 'Journey start date should be edited');
  })
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
            let customer = await DBFunctions.addCustomerDB(customer);
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