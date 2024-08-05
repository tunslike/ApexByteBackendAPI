
const ProductModel = require('../models/product.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');


// ENTRY CONTROLLER
class ProductController {

      // CREATE NEW TRANSACTION
        createNewTransaction = async (req, res, next) => {

         const transaction = await ProductModel.createTransaction(req.body);
    
           if(transaction) {
    
              console.log("Transaction added successfully!")
              res.status(200).send(transaction);
              return;
           }
    
           res.status(403).send("Unable to create transaction");
           return;
    
        }
      // END OF FUNCTION

         // CREATE NEW TRANSACTION
         createPaymentNetworks = async (req, res, next) => {

            const network = await ProductModel.createPaymentNetworks(req.body);
       
              if(network) {
       
                 console.log("Crypto network created successfully!")
                 res.status(200).send(network);
                 return;
              }
       
              res.status(403).send("Unable to create payment network");
              return;
       
           }
         // END OF FUNCTION

   // function to process callbacks
   createPaymentCallback = async (req, res, next) => {

      const payment = await ProductModel.createPaymentCallback(req.body);

       if(payment) {

          console.log("Callback processed successfully!")
          res.status(200).send(payment);
          return;
       }

       res.status(404).send("Unable to process request, please retry");
       return;
   }
   // end of function

   // function to create payment request
   createPaymentRequest = async (req, res, next) => {

      const payment = await ProductModel.createPaymentRequest(req.body);

      if(payment) {

         // create transaction
         /*
         const transaction = await ProductModel.createTransactionInner(req.body.entry_id, req.body.order_id, 
            'Gift Card', req.body.order_name, req.body.total_amount, 'Pending'); */

         console.log("Payment request processed successfully!")
         res.status(200).send(payment);
         return;
      }

      res.status(404).send("Unable to process request, please retry");
      return;

   }
   // end of function

    // function to fetch payment networks
    fetchPaymentNetworks = async (req, res, next) => {

      let networks = await ProductModel.fetchPaymentNetworks();
   
      if (!networks.length) {
          throw new HttpException(403, 'Unable to load crypto payment networks');
      }

      res.status(200).send(networks);
    }
    // end of function

        // function to fetch payment status
        fetchPaymentStatus = async (req, res, next) => {

         let paymentStatus = await ProductModel.fetchPaymentStatus({ TRANSACTION_ID: req.params.transid });

         if (paymentStatus) {
             res.status(200).send(paymentStatus);
             return;
         }
   
         res.status(200).send(null);
       }
       // end of function


        // function to fetch payment status
        setRedemptionStatus = async (req, res, next) => {

         let paymentStatus = await ProductModel.setRedemptionStatus(req.params.cardid);

         if (paymentStatus == 1) {
             res.status(200).send("Redeem Status Updated!");
             return;
         }
   
         res.status(200).send(null);
       }
       // end of function

     // CREATE NEW GIFT CARD
     createGiftCard = async (req, res, next) => {

      console.log(req.body)

      const product = await ProductModel.createNewGiftCard(req.body);
 
        if(product) {

          let narration = `${req.body.cardName} - ${req.body.quantity} Gift Card`;

          const createCardDetails = await ProductModel.createGiftOrderDetails(req.body.orderID, product, req.body.amount_purchased,
               req.body.currency_code, req.body.trans_id, req.body.fee, req.body.recipientEmail, req.body.recipientPhone,
               req.body.paymentStatus, req.body.transactionDateTime);

          const transaction = await ProductModel.createTransaction(req.body.entryID, req.body.orderID, req.body.cardType, narration, req.body.amount, req.body.paymentStatus);
 
           console.log("Gift card created successfully!")
           res.status(200).send(product);
           return;
        }
 
        res.status(403).send("Unable to create product");
        return;
     }
     // END OF FUNCTION

     // Fetch Transactions
     getTransactions = async  (req, res, next)  => {

      let transactions = await ProductModel.getTransactions({ ENTRY_ID: req.params.entryid });

      if (!transactions.length) {
          res.status(200).send(transactions);
          return;
      }

      res.status(200).send(transactions);

     }

       // Fetch Transactions
       fetchCustomerCards = async  (req, res, next)  => {

         let cardType = '';

         if(req.params.cardtype == 1) {
            cardType = 'Gift Card';
         }else if(req.params.cardtype == 2) {
            cardType = 'Virtual Credit Card';
         }

         let cards = await ProductModel.fetchCustomerCards(req.params.entryid, cardType);

         if (!cards.length) {
             throw new HttpException(403, 'Unable to load virtual cards');
         }
   
         res.status(200).send(cards);
   
        }

    // CREATE GIFT CARD BRAND
    createGiftCardBrand = async (req, res, next) => {

     const product = await ProductModel.createNewGiftCardBrand(req.body);

       if(product) {

          console.log("Brand created successfully!")
          res.status(200).send(product);
          return;
       }

       res.status(401).send("Unable to create product");
       return;

    }
    // END OF FUNCTION



}

module.exports = new ProductController;