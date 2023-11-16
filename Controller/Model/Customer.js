import DBFunctions from '../../Storage/DBFunctions.js';

function Customer(firstName, lastName, birthday, city) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.city = city;
}

async function getAllCustomers() {
    return await DBFunctions.getCustomersDB();
}

async function addCustomer(customer) {
    let c = {FirstName: customer.firstName, LastName: customer.lastName, Birthday: customer.birthday, City: customer.city}
    return await DBFunctions.addCustomerDB(c);
}

function editCustomer(customer) {
    let c = {FirstName: customer.FirstName, LastName: customer.LastName, Birthday: customer.Birthday, City: customer.City, Id: customer.Id}
    return DBFunctions.editCustomerDB(c);
}

function getCustomer(customer) {
    return DBFunctions.getCustomerDB(customer.Id);
}

async function deleteCustomer(customer) {
    let c = {FirstName: customer.FirstName, LastName: customer.LastName, Birthday: customer.Birthday, City: customer.City, Id: customer.Id}
    DBFunctions.deleteCustomerDB(c);
}

let customer1 = new Customer("Lucas", "Holm", "123456", "Viby");
customer1 = await addCustomer(customer1);

customer1.FirstName = 'bølle'
await editCustomer(customer1)

export default {addCustomer, getCustomer, deleteCustomer, editCustomer}