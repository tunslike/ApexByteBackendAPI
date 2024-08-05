const {v4: uuidv4} = require ('uuid');
const query = require('../db/db-connection');
const {multipleColumnSet} = require('../utils/common.utils');

//Entry Model
class EntryModel {


    // Authenticate User
    authenticateUser = async(authID) => {

        try {

            var date_created = new Date();

            const sql = `SELECT ENTRY_ID, AUTH_ID FROM Apex_ENTRY WHERE AUTH_ID = ?`;

            const result = await query(sql, [authID]);

            if(result) {

                const sql_update = `UPDATE Apex_ENTRY SET IS_LOGGED = ?, LAST_LOGIN_DATE = ? 
                                    WHERE AUTH_ID = ?`;

                const result_update = await query(sql_update, [1, date_created, authID]);

                const affectedRows = result ? result.affectedRows : 0;

                return result[0];
            }

            return null;

        }catch(ex) {

        }

    }
    // end of function

    // Create New Authenication
    createNewAuthenticationID = async ({entryID, entryPass}, ip, password) => {

        try {

            var date_created = new Date();
            const uniqueId = uuidv4();

            const sql = `INSERT INTO Apex_ENTRY (ENTRY_ID, AUTH_ID, 
                        ENTRY_PASS, DATE_CREATED, IP_ADDRESS) VALUES (?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, entryID, password, date_created, ip]);
            const affectedRows = result ? result.affectedRows : 0;

            return uniqueId;


        }catch(ex) {
            console.log(ex);
        }

    } // end of function

}

module.exports = new EntryModel;