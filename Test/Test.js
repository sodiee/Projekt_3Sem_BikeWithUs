var assert = require('assert');
import DBFunctions from './Storage/DBFunctions.js';

//DBFunctions-script test
describe('AddCustomer', () => {
    it('should return a customer'), () => {
        var customer = DBFunctions.addCustomer('Mikkel', 'Lindhøj', 'xxxxxx', 'Aarhus C')
        if (customer != null) {
            done();
        } else if (err) {
            done(err);
        }
    }
})