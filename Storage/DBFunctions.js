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
const CustomersCollection = collection(db, 'Customers');
const DriversCollection = collection(db, 'Drivers');
const AdminsCollection = collection(db, 'Admins');
const JourneyCollection = collection(db, 'Journeys');

// ------------------------
// DB functions for customer
// ------------------------
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
    customer.firstName = undefined;
    customer.lastName = undefined;
    customer.birthday = undefined;
    customer.city = undefined;
    return customer;
}

const addCustomerDB = async (customer) => {
    const docRef = await addDoc(CustomersCollection, customer);
    customer.id = docRef.id;
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

// ------------------------
// DB functions for driver
// ------------------------
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
    driver.id = docRef.id;
    return driver;
}

const editDriverDB = async (driver) => {
    console.log(driver)
    await updateDoc(doc(db, 'Drivers', driver.id), {
        firstName: driver.firstName, 
        lastName: driver.lastName, 
    });
};


// ------------------------
// DB functions for admin
// ------------------------
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
    return admin;
}

const deleteAdminDB = async (admin) => {
    const deletedAdmin = await deleteDoc(doc(db, 'Admins', admin.id));
    return admin;
}

const addAdminDB = async (admin) => {
    const docRef = await addDoc(AdminsCollection, admin);
    admin.id = docRef.id;
    return admin;
}

const editAdminDB = async (admin) => {
    console.log(admin)
    await updateDoc(doc(db, 'Admins', admin.id), {
        firstName: admin.firstName, 
        lastName: admin.lastName, 
        adminStatus: admin.adminStatus
    });
};

// ------------------------\\
// DB functions for journey\\
// ------------------------\\

let journey = {id: 'WRtB92faJCOjwS9vah8R'};

const getCustomerJourneysDB = async (customerId) => {
    try {
        const journeyQueryDocs = await getDocs(collection(db, 'Journey', where('customer.id', '==', customerId)));
        const journeys = journeyQueryDocs.docs.map(doc => {
            let data = doc.data();
            data.docID = doc.id;
            return data;
        });

        return journeys;
    } catch (error) {
        console.error('Fejl ved hentning af kundens rejser i DBFunctions:', error);
        throw new Error('Der opstod en fejl ved hentning af kundens rejser i DBFunctions.');
    }
};

const getJourneysDB = async () => {
    let journeyQueryDocs = await getDocs(JourneyCollection);
    let journey = journeyQueryDocs.docs.map(doc => {
        let data = doc.data();
        data.docID = doc.id;
        return data;
    });
    return journey;
}

const getJourneyDB = async (id) => {
    const docRef = doc(db, 'Journey', id);
    const journeyQueryDoc = await getDoc(docRef);
    let journey = journeyQueryDoc.data();
    journey.docID = journeyQueryDoc.id;
    return journey;
}

const addJourney3DaysDB = async (id) => {
    let customer = getCustomerDB(id) 
    const today = new Date()
    const nextThreeDays = new Date(today.setDate(today.getDate() + 3))
    let price = getPriceDB(this) //getPriceDB mangler at blive lavet
    
    let journey = new Journey(today, nextThreeDays, customer, price);
    const docRef = await addDoc(JourneyCollection, id);
    customer.id = docRef.id;
    return id;
}

const addJourney4DaysDB = async (id) => {
    let customer = await getCustomerDB(id) 
    const today = new Date()
    const endDate = new Date(today.setDate(today.getDate() + 4))
    let price = 5000 //getPriceDB(this) //getPriceDB mangler at blive lavet
    
    let journey = {startDate: today, endDate: endDate, customer: customer, price: price};
    const docRef = await addDoc(JourneyCollection, journey);
    journey.id = docRef.id;
    return id;
}
//virker
//addJourney4DaysDB('gCpdvCjNnQfJby3cQf9d');


const deleteJourneyDB = async (journey) => {
    const deletedJourney = await deleteDoc(doc(db, 'Journeys', journey.id));
    return id;
}

//virker
//deleteJourneyDB(journey);



const editJourneyDB = async (journey) => {
    await updateDoc(doc(db, 'Journeys', journey.id), {
        startDate: journey.startDate, 
        endDate: journey.endDate, 
        customer: journey.customer,
        price: journey.price,
        id: journey.id
    });
};
//let today = new Date()
//journey = {startDate: today, endDate: today.getDate() + 4, customer: await getCustomerDB('gCpdvCjNnQfJby3cQf9d'), price: 3000};
//editJourneyDB(journey)

const editStartDateDB = async (journey) => {
    await updateDoc(doc(db, 'Journeys', journey.id), {
        startDate: journey.startDate, 
    });
};  


export default {getCustomerDB, getCustomersDB, deleteCustomerDB, addCustomerDB, editCustomerDB,getAdminDB,
getAdminsDB,deleteAdminDB,addAdminDB,editAdminDB,getDriverDB,getDriversDB,deleteDriverDB,addDriverDB,editDriverDB,
addJourney3DaysDB, addJourney4DaysDB, editJourneyDB, deleteJourneyDB, getJourneyDB, getJourneysDB, getCustomerJourneysDB}