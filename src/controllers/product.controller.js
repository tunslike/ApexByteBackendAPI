
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

     // CREATE NEW GIFT CARD
     createGiftCard = async (req, res, next) => {

      const product = await ProductModel.createNewGiftCard(req.body);
 
        if(product) {

         let narration = `Payment of Quantity ${req.body.quantity} for ${req.body.cardName} Gift Card from Reloadly`;

          const transaction = await ProductModel.createTransaction(req.body.entryID, 'Gift Card', narration, req.body.amount, 'Successful');
 
           console.log("Gift card created successfully!")
           res.status(200).send(product);
           return;
        }
 
        res.status(403).send("Unable to create product");
        return;
 
     }
     // END OF FUNCTION

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