// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, 
    collection, 
    getDoc,
    getDocs, 
    doc, 
    deleteDoc, 
    addDoc,
    updateDoc,
    query,
    where
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

const getAdminByUsernameAndPassword = async (adminUsername, adminPassword) => {
    try {
        const adminsCollectionRef = collection(db, 'Admins');
        const adminQuerySnapshot = await getDocs(query(adminsCollectionRef, where('adminUsername', '==', adminUsername)));
    
        if (!adminQuerySnapshot.empty) {
          const adminDoc = adminQuerySnapshot.docs[0];
          const adminData = adminDoc.data();
    
          if (adminData.adminPassword === adminPassword && adminData.adminStatus === true) {
            console.log(adminData)
            return adminData; // Returner admin-data, hvis det matcher
          }
        }
    
        return null; // Ingen match fundet
      } catch (error) {
        console.error('Fejl under opslag i Firestore:', error);
        throw error; // Kast fejlen igen for yderligere håndtering
      }
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
        // Hent alle rejsedokumenter fra databasen
        const journeyQueryDocs = await getDocs(JourneyCollection);

        // Filtrer og map rejsedokumenter til dataarray
        const journeys = journeyQueryDocs.docs
            .filter(doc => doc.data().customer.docID === id) // Ændring her
            .map(doc => {
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


const getJourneyDB = async (docID) => {
    try {
        const docRef = doc(db, 'Journeys', docID);
        if (docRef.exists()) {
            const journeyQueryDoc = await getDoc(docRef);
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

const addJourneyDB = async (journey, customerId) => {
    const docRef = await addDoc(JourneyCollection, journey, customerId);
    journey.id = docRef.id;
    return journey;
};

const deleteJourneyDB = async (journeyID) => {
    try {
        await deleteDoc(doc(db, 'Journeys', journeyID));
        console.log('Journey deleted successfully.');
    } catch (error) {
        console.error('Error deleting journey:', error);
        throw new Error('An error occurred while deleting the journey.');
    }
};


const editJourneyDB = async (docID, journeyData) => {
    try {
        await updateDoc(doc(db, 'Journeys', docID), journeyData);
        console.log('Journey updated successfully.');
    } catch (error) {
        console.error('Error updating journey:', error);
        throw new Error('There was an error updating the journey.');
    }
};

const editStartDateDB = async (journey) => {
    await updateDoc(doc(db, 'Journeys', journey.id), {
        startDate: journey.startDate, 
    });
};  


export default {getCustomerDB, getCustomersDB, deleteCustomerDB, addCustomerDB, editCustomerDB,getAdminDB,
getAdminsDB,deleteAdminDB,addAdminDB,editAdminDB,getAdminByUsernameAndPassword,getDriverDB,getDriversDB,deleteDriverDB,addDriverDB,editDriverDB,
addJourneyDB, editJourneyDB, deleteJourneyDB, getJourneyDB, getJourneysDB, getCustomerJourneysDB}