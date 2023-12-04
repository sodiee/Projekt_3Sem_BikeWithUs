import DBFunctions from '../../Storage/DBFunctions.js';


// Er tjekket for korrektur

async function addAdmin(admin) {
    let a = {firstName: admin.firstName, lastName: admin.lastName}
    return await DBFunctions.addAdminDB(a);
}

function getAdmin(admin) {
    return DBFunctions.getAdminDB(admin.id);
}

async function checkAdmin(adminUsername, adminPassword) {
    try {
      return await DBFunctions.getAdminByUsernameAndPassword(adminUsername, adminPassword);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

function deleteAdmin(admin) {
    let a = {firstName: admin.firstName, lastName: admin.lastName, id: admin.id};
    DBFunctions.deleteAdminDB(a);
}

function editAdmin(admin) {
    let a = {firstName: admin.firstName, lastName: admin.lastName, id: admin.id}
    DBFunctions.editAdminDB(a);
}

async function getAdmins() {
    return await DBFunctions.getAdminsDB();
}

export default {addAdmin, getAdmin, checkAdmin, deleteAdmin, editAdmin, getAdmins}