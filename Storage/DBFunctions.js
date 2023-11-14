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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
const CustomersCollection = collection(db, 'Customers')

const getCustomers = async () => {
    let customersQueryDocs = await getDocs(customersQueryDocs);
    let customers = customersQueryDocs.docs.map(doc => {
        let data = doc.data();
        data.docID = doc.id;
        return data;
    });
    return customers;
}

const getCustomer = async (id) => {
    const docRef = doc(db, 'Customers', id);
    const customerQueryDoc = await getDoc(docRef);
    let customer = customerQueryDoc.data();
    customer.docID = customerQueryDoc.id;
    return customer;
}

const deleteCustomer = async (id) => {
    const deletedCustomer = await deleteDoc(doc(db, 'Customer', id)); 
}

const addCustomer = async (fornavn, efternavn, fødselsdag, by) => {
    const customer = {Fornavn: fornavn, Efternavn: efternavn, Fødselsdag: fødselsdag, By: by};
    const docRef = await addDoc(CustomersCollection, car);
    return customer;
}

const editCustomer = async (customer) => {
    await updateDoc(doc(db, 'Customers', customer.customerID), {
        Fornavn: customer.fornavn,
        Efternavn: customer.efternavn,
        Fødselsdag: customer.fødselsdag,
        By: customer.by
    });
};

export default {getCustomer, getCustomer, deleteCustomer, addCustomer, editCustomer}