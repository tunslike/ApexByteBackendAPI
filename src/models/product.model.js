const {v4: uuidv4} = require ('uuid');
const query = require('../db/db-connection');
const {multipleColumnSet} = require('../utils/common.utils');

class ProductModel {


      // Create Transaction
      createTransaction = async (entryID, transType, narration, amount, status) => {

        try {

            var date_created = new Date();
            const uniqueId = uuidv4();

            const sql = `INSERT INTO Apex_TRANSACTIONS (TRANSACTION_ID, ENTRY_ID, TRANS_TYPE, NARRATION, 
                         AMOUNT, DATE_CREATED, PAYMENT_STATUS) VALUES (?,?,?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, entryID, transType, narration, amount, date_created, status]);

            const affectedRows = result ? result.affectedRows : 0;

            return uniqueId;

        }catch(ex) {
            console.log(ex);
        }
    }

    // Create new Gift Card
    createNewGiftCard = async ({entryID, cardType, cardName, amount, quantity, issuer, payment_type}) => {

        try {

            var date_created = new Date();
            const uniqueId = uuidv4();

            const sql = `INSERT INTO Apex_CARDS (CARD_ID, ENTRY_ID, CARD_TYPE, 
                         CARD_NAME, AMOUNT, QUANTITY, DATE_CREATED, ISSUER, PAYMENT_TYPE) 
                         VALUES (?,?,?,?,?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, entryID, cardType, cardName, amount, quantity, 
                                            date_created, issuer, payment_type]);

            const affectedRows = result ? result.affectedRows : 0;

            return uniqueId;

        }catch(ex) {
            console.log(ex);
        }
    }

    // end of function

      // Create New Gift Card brand
      createNewGiftCardBrand = async ({brandName, countryCode, category}) => {

        try {

            var date_created = new Date();
            const uniqueId = uuidv4();

            const sql = `INSERT INTO Apex_GIFT_CARD_BRANDS (BRAND_ID, 
            BRAND_NAME, COUNTRY_CODE, CATEGORY, DATE_CREATED) VALUES (?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, brandName, countryCode, category, date_created]);
            const affectedRows = result ? result.affectedRows : 0;

            return uniqueId;

        }catch(ex) {
            console.log(ex);
        }

    } // end of function

}

module.exports = new ProductModel;