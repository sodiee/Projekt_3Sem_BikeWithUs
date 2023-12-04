import DBFunctions from '../../Storage/DBFunctions.js';

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
      throw error;
    }
  }
export default {addCustomer, getCustomer, deleteCustomer, editCustomer, getCustomers, checkCustomer}