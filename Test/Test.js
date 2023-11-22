import DBFunctions from '../Storage/DBFunctions.js';
import chai from 'chai'
const assert = chai.assert

//DBFUNCTIONS TEST 

describe('Crud test på Journey', () => {
    let journeyM;
    let customer = { firstName: "Mewkel", lastName: "Lindhøøøøøj", birthday: "160795", city: "Frederiksbjerg" };
    let price = 5000;
    let startDate = new Date();
    let endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
  
    beforeEach(() => {
      journeyM = { startDate, endDate, customer, price };
    });
  
    it('Should return a journey', async () => {
      const result = await DBFunctions.getJourneyDB(journeyM);
      assert.deepStrictEqual(result, journeyM);
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

        it('should edit a journeys start date', async () => {

            let newJourney = await DBFunctions.addJourney3DaysDB(journey);
            journey = {customer: customer, endDate: 25/11/2025, price: 4000, startDate: 21/11/2025};
            newDate.startDate = '2024-05-05';

            await DBFunctions.editStartDateDB(journey)
            assert.strictEqual(newJourney.startDate, '2024-05-05', 'Journey should be edited');
        })
});