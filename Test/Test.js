import DBFunctions from '../Storage/DBFunctions.js';
import chai from 'chai'
const assert = chai.assert

//DBFunctions-script test
describe('DBFunctions TESTS', () => {
    it('should add a customer', async () => {
        let customerID = await DBFunctions.addCustomer('Mikkel', 'Lindhøj', 'xxxxxx', 'Aarhus C');

        assert.notStrictEqual(customerID, null, 'Customer ID should not be null');
    })

    it('should delete a customer', async () => {
        let customerToDelete = await DBFunctions.addCustomer('Mikkel', 'Lindhøj', 'xxxxxx', 'Aarhus C');
        await DBFunctions.deleteCustomer(customerToDelete);

        let deletedCustomer = await DBFunctions.getCustomer(customerToDelete);
        assert.strictEqual(deletedCustomer, null, 'Customer should be deleted');
    })


     it('should return a customer', async () => {
        let customerID = await DBFunctions.addCustomer('Mikkel', 'Lindhøj', 'xxxxxx', 'Aarhus C');
        let customer = await DBFunctions.getCustomer(customerID);

        assert.notStrictEqual(customer, null, 'Customer should exist');
    })

    it('should edit a customer', async () => {
        let customer = await DBFunctions.getCustomer(customerID);
        customer.fornavn = 'NyFornavn';

        
        await DBFunctions.editCustomer(customerID, {
            fornavn: customer.fornavn,
            efternavn: customer.efternavn,
            fødselsdag: customer.fødselsdag,
            by: customer.by
        });

        let editedCustomer = await DBFunctions.getCustomer(customerID);
        assert.strictEqual(editedCustomer.fornavn, 'NyFornavn', 'Customer should be edited');
    });
})

