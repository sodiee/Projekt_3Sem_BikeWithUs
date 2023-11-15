import DBFunctions from '../../Storage/DBFunctions.js';

function Customer(firstName, lastName, birthday, city) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.city = city;
}

function addCustomer(customer) {
    DBFunctions.addCustomerDB(customer.firstName, customer.lastName, customer.birthday, customer.city);
}

function editCustomer(customer) {
    DBFunctions.editCustomerDB(customer.firstName, customer.lastName, customer.birthday, customer.city);
}

function getCustomer(customer) {
    DBFunctions.getCustomerDB(customer.id);
}

function deleteCustomer(customer) {
    DBFunctions.deleteCustomerDB(customer.id);
}

let customer1 = new Customer("Lucas", "Holm", "xxxxxx", "Viby");
addCustomer(customer1);
//deleteCustomer('CBAB0zieWucV3kRPNGgF');
console.log('CBAB0zieWucV3kRPNGgF');
console.log(customer1.id);

export default {addCustomer, getCustomer, deleteCustomer, editCustomer}