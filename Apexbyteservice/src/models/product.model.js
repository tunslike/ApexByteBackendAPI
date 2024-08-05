const {v4: uuidv4} = require ('uuid');
const query = require('../db/db-connection');
const {multipleColumnSet} = require('../utils/common.utils');

class ProductModel {


      // Create Transaction
      createTransaction = async (entryID, orderID, transType, narration, amount, paymentStatus) => {

        try {

            var date_created = new Date();
            const uniqueId = uuidv4();

            const sql = `INSERT INTO Apex_TRANSACTIONS (TRANSACTION_ID, ORDER_ID, ENTRY_ID, TRANS_TYPE, NARRATION, 
                         AMOUNT, DATE_CREATED, PAYMENT_STATUS) VALUES (?,?,?,?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, orderID, entryID, transType, narration, amount, date_created, paymentStatus]);

            const affectedRows = result ? result.affectedRows : 0;

            return uniqueId;

        }catch(ex) {
            console.log(ex);
        }
    }

      // Create Transaction
      createTransactionInner = async (entryID, orderID, transType, narration, amount, status) => {

        try {

            var date_created = new Date();
            const uniqueId = uuidv4();

            const sql = `INSERT INTO Apex_TRANSACTIONS (TRANSACTION_ID, ENTRY_ID, ORDER_ID, TRANS_TYPE, NARRATION, 
                         AMOUNT, DATE_CREATED, PAYMENT_STATUS) VALUES (?,?,?,?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, entryID, orderID, transType, narration, amount, date_created, status]);

            const affectedRows = result ? result.affectedRows : 0;

            return uniqueId;

        }catch(ex) {
            console.log(ex);
        }
    }


         // Create Payment Network
         createPaymentNetworks = async ({network, currency, min_amount, max_amount}) => {

            try {

                
                //console.log(network + '/' + currency + '/' + min_amount + '/' + max_amount);
                //return;
    
                var date_created = new Date();
                const uniqueId = uuidv4();
    
                const sql = `INSERT INTO Apex_PAYMENT_NETWORKS (NETWORK_ID, NETWORK, 
                             CURRENCY, MIN_AMOUNT, MAX_AMOUNT, DATE_CREATED, CREATED_BY) 
                             VALUES (?,?,?,?,?,?,?)`;
    
                const result = await query(sql, [uniqueId, network, currency, min_amount, max_amount, date_created, 'SYSTEM']);
    
                const affectedRows = result ? result.affectedRows : 0;
    
                return uniqueId;
    
            }catch(ex) {
                console.log(ex);
            }
        }
    
    
        // GET ALL TRANSACTIONS
        getTransactions = async (params = {}) => {

            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `SELECT TRANSACTION_ID, TRANS_TYPE, 
                        NARRATION, AMOUNT, DATE_CREATED, PAYMENT_STATUS FROM 
                        Apex_TRANSACTIONS WHERE ${columnSet} ORDER BY DATE_CREATED DESC`;
    
            const result = await query(sql, [...values]);
    
            return result;
        }

        // FETCH CARDS
        fetchCustomerCards = async (entryid, cardtype) => {
        
                const sql = `SELECT C.CARD_ID, C.ORDER_ID, C.CARD_TYPE, C.CARD_NAME, C.AMOUNT, 
                            C.TOTAL_AMOUNT, C.QUANTITY, C.REDEEM_INSTRUCTION, 
                            C.IMAGE_URL, C.DATE_CREATED, C.REDEEM_STATUS, C.DATE_REDEEMED, 
                            C.REDEEM_STATUS, D.TRANSACTION_ID, D.RECIPENT_EMAIL, 
                            D.RECIPENT_PHONE FROM Apex_CARDS C LEFT JOIN 
                            Apex_CARD_ORDER_DETAILS D ON C.CARD_ID = D.CARD_ID 
                            WHERE C.CARD_TYPE = ? AND C.ENTRY_ID = ?`;
        
                const result = await query(sql, [cardtype, entryid]);
        
                return result;
        }

        //function to process callback
        createPaymentCallback = async ({uuid, order_id, address_in, address_out, txid_in, txid_out, confirmations,
                                    value_coin, value_coin_convert, value_forwarded_coin, value_forwarded_coin_convert,
                                    fee_coin, coin, price, pending}) => {

            try {

                var date_created = new Date();
                const uniqueId = uuidv4();

                const sql = `INSERT INTO Apex_PAYMENT_CALLBACK (PAYMENT_ID, ORDER_ID, CALLBACK_UUID, ADDRESS_IN, 
                            ADDRESS_OUT, TXID_IN, TXID_OUT, CONFIRMATION, PAMENT_VALUE, PAID_VALUE, 
                            FEE_COIN, COIN, PRICE, PENDING, DATE_CREATED, CREATED_BY) 
                            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

                const result = await query(sql, [uniqueId, order_id, uuid, address_in, address_out, txid_in, txid_out, 
                                                confirmations, value_coin, value_forwarded_coin, 
                                            fee_coin, coin, price, pending, date_created, 'CryptAPI']);

                const affectedRows = result ? result.affectedRows : 0;

                return uniqueId;

            }catch(ex) {
                console.log(ex);
            }
        
        }
        //end of function


        // function to create payment request
        createPaymentRequest = async ({entry_id, order_id, order_name, amount, quantity, total_amount, currency, crypto_market,
                                        wallet_address_in, wallet_address_out, callback_url}) => {

            try {

                var date_created = new Date();
                const uniqueId = uuidv4();

                const sql = `INSERT INTO Apex_PAYMENT_REQUEST (ORDER_ID, ENTRY_ID, ORDER_NAME, AMOUNT, QUANTITY, 
                             TOTAL_AMOUNT, CURRENCY, CRYPTO_PAYMENT, WALLET_ADDRESS_IN, WALLET_ADDRESS_OUT, 
                             CALLBACK_URL, DATE_CREATED, CREATED_BY) 
                             VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

                const result = await query(sql, [order_id, entry_id, order_name, amount, quantity, total_amount, 
                                        currency, crypto_market, wallet_address_in, wallet_address_out, 
                                        callback_url, date_created, 'SYSTEM']);

                const affectedRows = result ? result.affectedRows : 0;

                return uniqueId;

            }catch(ex) {
                console.log(ex);
            }

        }
        // end of function

        // FETCH CRYPTO PAYMENT NETWORKS
        fetchPaymentNetworks = async () => {
            
            const sql = `SELECT * FROM Apex_PAYMENT_NETWORKS WHERE STATUS = 0`;
    
            const result = await query(sql);
    
            return result;
    }
        
        // GET PAYMENT STATUS
        fetchPaymentStatus = async (params = {}) => {

            const { columnSet, values } = multipleColumnSet(params)
            
            const sql = `SELECT R.TOTAL_AMOUNT, R.CURRENCY, R.WALLET_ADDRESS_IN FROM 
            Apex_TRANSACTIONS T LEFT JOIN Apex_PAYMENT_REQUEST R ON T.ORDER_ID = R.ORDER_ID WHERE ${columnSet}`;
    
            const result = await query(sql, [...values]);
    
            return result[0];
        }

    // Create new Order Details
    createGiftOrderDetails = async (orderID, cardid, amount_purchased, currency_code, trans_id, 
                        fee, recipientEmail, recipientPhone, paymentStatus, transactionDateTime) => {
        try {

            /*
            console.log(orderID+'/'+cardid+'/'+amount_purchased+'/'+currency_code+'/'+trans_id+'/'+
                        fee + '/' + recipientEmail + '/' + recipientPhone + '/'+ paymentStatus + '/' + transactionDateTime
            ); 

            return;
            */

            var date_created = new Date();
            const uniqueId = uuidv4();

            const sql = `INSERT INTO Apex_CARD_ORDER_DETAILS (ORDER_ID, CARD_ID, AMOUNT_PURCHASED, 
                         CURRENCY_CODE, TRANSACTION_ID, FEE, RECIPENT_EMAIL, RECIPENT_PHONE, 
                         TRANSACTION_CREATED_TIME, PAYMENT_STATUS, DATE_CREATED) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

            const result = await query(sql, [orderID, cardid, amount_purchased, currency_code, trans_id, fee, 
                                            recipientEmail, recipientPhone, transactionDateTime, paymentStatus, date_created]);

            const affectedRows = result ? result.affectedRows : 0;

            return uniqueId;

        }catch(ex) {
            console.log(ex);
        }
    }

    // end of function

    // Create new Gift Card
    createNewGiftCard = async ({entryID, orderID, cardType, cardName, amount, quantity, redeemInstruction, image_url,
                                issuer, payment_type, redeem_status}) => {

        try {

            var date_created = new Date();
            const uniqueId = uuidv4();
            let totalAmount = amount * quantity;

            const sql = `INSERT INTO Apex_CARDS (CARD_ID, ORDER_ID, ENTRY_ID, CARD_TYPE, 
                         CARD_NAME, AMOUNT, TOTAL_AMOUNT, QUANTITY, REDEEM_INSTRUCTION, IMAGE_URL, DATE_CREATED, 
                         ISSUER, PAYMENT_TYPE, REDEEM_STATUS) 
                         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

            const result = await query(sql, [uniqueId, orderID, entryID, cardType, cardName, amount, totalAmount, quantity, 
                redeemInstruction,image_url, date_created, issuer, payment_type, redeem_status]);

            const affectedRows = result ? result.affectedRows : 0;

            return uniqueId;

        }catch(ex) {
            console.log(ex);
        }
    }

    // end of function

    //function to update redeemption status
    setRedemptionStatus = async (cardid) => {
        try {


            var date_created = new Date();

            const sql_update = `UPDATE Apex_CARDS SET REDEEM_STATUS = 'Redeemed', 
                                DATE_REDEEMED = ? WHERE CARD_ID = ?`;

            const result_update = await query(sql_update, [date_created, cardid]);

            return result_update;

        }catch(ex) {
            console.log(ex)
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