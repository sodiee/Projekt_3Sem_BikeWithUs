import DBFunctions from '../../Storage/DBFunctions.js';

function Customer(firstName, lastName, birthday, city) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.city = city;
}

async function addCustomer(customer) {
    let c = {FirstName: customer.firstName, LastName: customer.lastName, Birthday: customer.birthday, City: customer.city}
    return await DBFunctions.addCustomerDB(c);
}

function editCustomer(customer) {
    let c = {FirstName: customer.firstName, LastName: customer.lastName, Birthday: customer.birthday, City: customer.city, Id: customer.Id}
    DBFunctions.editCustomerDB(c);
}

function getCustomer(customer) {
    DBFunctions.getCustomerDB(customer.id);
}

function deleteCustomer(customer) {
    let c = {FirstName: customer.firstName, LastName: customer.lastName, Birthday: customer.birthday, City: customer.city, Id: customer.Id}
    DBFunctions.deleteCustomerDB(c);
}

async function getCustomers() {
    return await DBFunctions.getCustomersDB();
}

let customer1 = new Customer("Lucas", "Holm", "123456", "Viby");
customer1 = await addCustomer(customer1)
customer1.firstName = 'Celina'
await editCustomer(customer1);

export default {addCustomer, getCustomer, deleteCustomer, editCustomer, getCustomers}