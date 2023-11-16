// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, 
    collection, 
    getDoc,
    getDocs, 
    doc, 
    deleteDoc, 
    addDoc,
    updateDoc
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrsey-IX0FhSucNOCKDrEn8ofFzbwn_7o",
  authDomain: "bikewithus-7e8f0.firebaseapp.com",
  projectId: "bikewithus-7e8f0",
  storageBucket: "bikewithus-7e8f0.appspot.com",
  messagingSenderId: "285890761175",
  appId: "1:285890761175:web:ece7f116b6154b440ebb92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//CustomerCollection
const CustomersCollection = collection(db, 'Customers')

//DB functions for customer

const getCustomersDB = async () => {
    let customersQueryDocs = await getDocs(CustomersCollection);
    let customers = customersQueryDocs.docs.map(doc => {
        let data = doc.data();
        data.docID = doc.id;
        return data;
    });
    return customers;
}

const getCustomerDB = async (id) => {
    const docRef = doc(db, 'Customers', id);
    const customerQueryDoc = await getDoc(docRef);
    let customer = customerQueryDoc.data();
    customer.docID = customerQueryDoc.id;
    return customer;
}

const deleteCustomerDB = async (customer) => {
    const deletedCustomer = await deleteDoc(doc(db, 'Customers', customer.id));
    return customer;
}

const addCustomerDB = async (customer) => {
    const docRef = await addDoc(CustomersCollection, customer);
    customer.Id = docRef.id;
    return customer;
}

const editCustomerDB = async (customer) => {
    await updateDoc(doc(db, 'Customers', customer.id), {
        FirstName: customer.firstName, 
        LastName: customer.lastName, 
        Birthday: customer.birthday, 
        City: customer.city,
    });
};

// DB functions for driver
const getDriversDB = async () => {
    let driversQueryDocs = await getDocs(DriversCollection);
    let drivers = driversQueryDocs.docs.map(doc => {
        let data = doc.data();
        data.docID = doc.id;
        return data;
    });
    return drivers;
}

const getDriverDB = async (id) => {
    const docRef = doc(db, 'Drivers', id);
    const driverQueryDoc = await getDoc(docRef);
    let driver = driverQueryDoc.data();
    driver.docID = driverQueryDoc.id;
    return driver;
}

const deleteDriverDB = async (driver) => {
    const deletedDriver = await deleteDoc(doc(db, 'Drivers', driver.id));
    return driver;
}

const addDriverDB = async (driver) => {
    const docRef = await addDoc(DriversCollection, driver);
    driver.Id = docRef.id;
    return driver;
}

const editDriverDB = async (id) => {
    console.log(driver)
    await updateDoc(doc(db, 'Drivers', driver.id), {
        FirstName: driver.firstName, 
        LastName: driver.lastName, 
        Birthday: driver.birthday, 
        City: driver.city
    });
};

const getAdminsDB = async () => {
    let adminsQueryDocs = await getDocs(AdminsCollection);
    let admins = adminsQueryDocs.docs.map(doc => {
        let data = doc.data();
        data.docID = doc.id;
        return data;
    });
    return admins;
}

const getAdminDB = async (id) => {
    const docRef = doc(db, 'Admins', id);
    const adminQueryDoc = await getDoc(docRef);
    let admin = adminQueryDoc.data();
    admin.docID = adminQueryDoc.id;
    return customer;
}

const deleteAdminDB = async (admin) => {
    const deletedDriver = await deleteDoc(doc(db, 'Admins', driver.id));
    return driver;
}

const addAdminDB = async (id) => {
    const docRef = await addDoc(AdminsCollection, admin);
    admin.Id = docRef.id;
    return admin;
}

const editAdminDB = async (id) => {
    console.log(driver)
    await updateDoc(doc(db, 'Admins', admin.id), {
        FirstName: admin.firstName, 
        LastName: admin.lastName, 
        Birthday: admin.birthday, 
        City: admin.city
    });
};


//virker
//let customer = {FirstName: "Mikkel", LastName: "Lindhøj", Birthday: "xxxxxx", City: "Aarhus C"};
//addCustomerDB(customer);

//virker
//deleteCustomerDB('x1r07fGRwLR2BgYpEtu2');

//virker ikke
//var customer = getCustomerDB('JaR4YWPQMoVlS7vzPSGv')
//customer.fornavn = "Bølle"
//console.log('udenfor metode')
//console.log(customer);
//console.log('udenfor metode')
//await editCustomerDB(customer);

//virker ik
//var customers = getCustomers();
//console.log(customers)

export default {getCustomerDB, getCustomerDB, deleteCustomerDB, addCustomerDB, editCustomerDB}