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

let journeyM;
let customer = { firstName: "Mewkel", lastName: "Lindhøøøøøj", birthday: "160795", city: "Frederiksbjerg" };
let price = 5000;
let startDate = new Date();
let endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
  
   
journeyM = { startDate, endDate, customer, price };
    
  


const getCustomerJourneysDB = async (id) => {
    try {
        const journeyQueryDocs = await getDocs(JourneyCollection);

        // Filtrer og map rejsedokumenter til dataarray
        const customerJourneys = journeyQueryDocs.docs
            .filter(doc => doc.data().customer && doc.data().customer.id === id)
            .map(doc => {
                let data = doc.data();
                data.docID = doc.id;
                return data;
            });

        return customerJourneys;
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
    try {
        const docRef = doc(db, 'Journey', id);
        const journeyQueryDoc = await getDoc(docRef);

        // Tjek om journeyQueryDoc er ikke-undefined
        if (journeyQueryDoc.exists()) {
            let journey = journeyQueryDoc.data();
            journey.docID = journeyQueryDoc.id;
            return journey;
        } else {
            throw new Error('Dokumentet eksisterer ikke.');
        }
    } catch (error) {
        console.error('Fejl ved hentning af rejse i DBFunctions:', error);
        throw new Error('Der opstod en fejl ved hentning af rejse i DBFunctions.');
    }
};
const addJourney3DaysDB = async (id) => {
    try {
        let customer = await getCustomerDB(id);
        const today = new Date();
        const endDate = new Date(today.getTime());
        endDate.setDate(today.getDate() + 3);
        let price = 4000;

        let journey = { startDate: today.toLocaleDateString(), endDate: endDate.toLocaleDateString(), customer: customer, price: price };

        const docRef = await addDoc(JourneyCollection, journey);
        journey.id = docRef.id;

        console.log('Added journey:', journey);
        return journey;
    } catch (error) {
        console.error('Fejl ved tilføjelse af rejse i DBFunctions:', error);
        throw new Error('Der opstod en fejl ved tilføjelse af rejse i DBFunctions.');
    }
};

const addJourney4DaysDB = async (id) => {
    try {
        let customer = await getCustomerDB(id);
        const today = new Date();
        const endDate = new Date(today.getTime());
        endDate.setDate(today.getDate() + 4);
        let price = 5000;

        let journey = { startDate: today.toLocaleDateString(), endDate: endDate.toLocaleDateString(), customer: customer, price: price };

        const docRef = await addDoc(JourneyCollection, journey);
        journey.id = docRef.id;

        console.log('Added journey:', journey);
        return journey;
    } catch (error) {
        console.error('Fejl ved tilføjelse af rejse i DBFunctions:', error);
        throw new Error('Der opstod en fejl ved tilføjelse af rejse i DBFunctions.');
    }
};
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

const runJourneyTests = async () => {
    
    const customerId = 'gCpdvCjNnQfJby3cQf9d'
    const customerId2 = 'bFjjlEWC5soHOcTV0pGQ'

    try {
        console.log('Testing getCustomerJourneysDB...');
        const customerJourneys = await getCustomerJourneysDB(customerId2);
        console.log('Customer journeys:', customerJourneys);

        /* 
        console.log('Testing getJourneysDB...');
        const allJourneys = await getJourneysDB();
        console.log('All journeys:', allJourneys);

        console.log('Testing addJourney4DaysDB...');
        const addedJourney4Days = await addJourney4DaysDB(customerId2);
        console.log('Added journey:', addedJourney4Days);

        console.log('Testing addJourney3DaysDB...');
        const addedJourney3Days = await addJourney3DaysDB(customerId2);
        console.log('Added journey:', addedJourney3Days);
        */
        //console.log('Testing GetJourneyDB');
        //const getJourneyDBtest = await getJourneyDB(customerId)
        //console.log('Testing deleteJourneyDB...');

        

        
        // ... (fortsæt med at tilføje tests for dine andre metoder)
        
    } catch (error) {
        console.error('Error during journey tests:', error);
    }
};

// Kald funktionen for at køre dine tests
runJourneyTests();

const runJourneyTests = async () => {
    
    const customerId = 'gCpdvCjNnQfJby3cQf9d'
    const customerId2 = 'bFjjlEWC5soHOcTV0pGQ'

    try {
        console.log('Testing getCustomerJourneysDB...');
        const customerJourneys = await getCustomerJourneysDB(customerId2);
        console.log('Customer journeys:', customerJourneys);

        /* 
        console.log('Testing getJourneysDB...');
        const allJourneys = await getJourneysDB();
        console.log('All journeys:', allJourneys);

        console.log('Testing addJourney4DaysDB...');
        const addedJourney4Days = await addJourney4DaysDB(customerId2);
        console.log('Added journey:', addedJourney4Days);

        console.log('Testing addJourney3DaysDB...');
        const addedJourney3Days = await addJourney3DaysDB(customerId2);
        console.log('Added journey:', addedJourney3Days);
        */
        //console.log('Testing GetJourneyDB');
        //const getJourneyDBtest = await getJourneyDB(customerId)
        //console.log('Testing deleteJourneyDB...');

        

        
        // ... (fortsæt med at tilføje tests for dine andre metoder)
        
    } catch (error) {
        console.error('Error during journey tests:', error);
    }
};

// Kald funktionen for at køre dine tests
runJourneyTests();

const editStartDateDB = async (journey) => {
    await updateDoc(doc(db, 'Journeys', journey.id), {
        startDate: journey.startDate, 
    });
};  


export default {getCustomerDB, getCustomersDB, deleteCustomerDB, addCustomerDB, editCustomerDB,getAdminDB,
getAdminsDB,deleteAdminDB,addAdminDB,editAdminDB,getDriverDB,getDriversDB,deleteDriverDB,addDriverDB,editDriverDB,
addJourney3DaysDB, addJourney4DaysDB, editJourneyDB, deleteJourneyDB, getJourneyDB, getJourneysDB, getCustomerJourneysDB}