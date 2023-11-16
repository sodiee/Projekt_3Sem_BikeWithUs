import DBFunctions from '../Storage/DBFunctions.js';
import chai from 'chai'
const assert = chai.assert

//DBFunctions-script test
describe('CRUD test på Customer', () => {
    let addedCustomerId;
    // An after each to delete the object from the databse after each test
    afterEach(async () => {
        if (addedCustomerId) {
            await DBFunctions.deleteCustomerDB(addedCustomerId);
        }
    })


        it('should add a customer', async () => {
            let customer = await DBFunctions.addCustomerDB('Mikkel', 'Lindhøj', 'xxxxxx', 'Aarhus C');
            addedCustomerId = customer.id

            assert.isNotNull(addedCustomerId,'The customers ID must not be null')
        })
        

        it('should delete a customer', async () => {
            let customerToDelete = await DBFunctions.addCustomerDB('Mikkel', 'Lindhøj', 'xxxxxx', 'Aarhus C');
            addedCustomerId = customerToDelete.id
            DBFunctions.deleteCustomerDB(addedCustomerId)

            
            assert.isUndefined(addedCustomerId,'Customer should be removed')
        })


        it('should return a customer', async () => {
            let customerC = await DBFunctions.addCustomerDB('Mikkel', 'Lindhøj', 'xxxxxx', 'Aarhus C');
            let customerG = await DBFunctions.getCustomerDB(customerC);

            assert.notStrictEqual(customerG, null, 'Customer should exist');
        })

        it('should edit a customer', async () => {
            let customerC = await DBFunctions.addCustomerDB('Mikkel', 'Lindhøj', 'xxxxxx', 'Aarhus C');
            let customerG = await DBFunctions.getCustomerDB(id);
            customerG.fornavn = 'NyFornavn';

        
            await DBFunctions.editCustomerDB(customerID, {
                fornavn: customer.fornavn,
                efternavn: customer.efternavn,
                fødselsdag: customer.fødselsdag,
                by: customer.by
        });

            let editedCustomer = await DBFunctions.getCustomerDB(customerID);
            assert.strictEqual(editedCustomer.fornavn, 'NyFornavn', 'Customer should be edited');
    });
})