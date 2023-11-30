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
    let c = {firstName: customer.firstName, lastName: customer.lastName, birthday: customer.birthday, city: customer.city}
    return await DBFunctions.addCustomerDB(c);
}

function editCustomer(customer) {
    let c = {firstName: customer.firstName, lastName: customer.lastName, birthday: customer.birthday, city: customer.city, id: customer.id}
    return DBFunctions.editCustomerDB(c);
}

function getCustomer(id) {
    return DBFunctions.getCustomerDB(id);
}

async function deleteCustomer(customer) {
    let c = {firstName: customer.firstName, lastName: customer.lastName, birthday: customer.birthday, city: customer.city, id: customer.id}
    DBFunctions.deleteCustomerDB(c);
}

async function getCustomers() {
    return await DBFunctions.getCustomersDB();
}

async function checkCustomer(customerUsername, customerPassword) {
    try {
      return await DBFunctions.getCustomerByUsernameAndPassword(customerUsername, customerPassword);
    } catch (error) {
      console.error(error);
      throw error; // Kast fejlen igen for yderligere håndtering
    }
  }

  

/*
let customer1 = new Customer("Lucas", "Holm", "123456", "Viby");
customer1 = await addCustomer(customer1);

customer1.FirstName = 'bølle'
await editCustomer(customer1)
*/

export default {addCustomer, getCustomer, deleteCustomer, editCustomer, getCustomers, checkCustomer}