
const EntryModel = require('../models/entry.model');
const HttpException = require('../utils/HttpException.utils');
const bcrypt = require('bcryptjs');


// ENTRY CONTROLLER
class EntryController {


       // hash password if it exists
       hashPassword = async (password) => {
        if (password) {
            password = await bcrypt.hash(password, 8);
        }
        return password;
    }

    // VALIDATE AUTHORISE USER
    validateAuthoriseUser = async (req, res, next) => {

     const user = await EntryModel.authenticateUser(req.body.authID);

       if(user) {

          console.log("Login was successful!")
          res.status(200).send(user);
          return;
       }

       res.status(401).send("Incorrect Authenticate ID");
       return;

    }

    // END OF FUNCTION

    // CREATE NEW ACCOUNT
    createAccount = async (req, res, next) => {


        let password = await this.hashPassword(req.body.entryPass);

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        const entry_id = await EntryModel.createNewAuthenticationID(req.body, ip, password);

        if (!entry_id) {

            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send(entry_id);

    }
    // END OF FUNCTION

    //GET AUTHENTICATED ID
    fetchAuthenticatedID = async (req, res, next) => {

        const getRandomChars = (length, chars) => {
            let result = '';
            const charsLength = chars.length;
            for (let i = 0; i < length; i++) {
              result += chars.charAt(Math.floor(Math.random() * charsLength));
            }
            return result;
          };
        
          const getRandomSegment = () => {
            const digits = '0123456789';
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const digitSegment = getRandomChars(4, digits);
            const letterSegment = getRandomChars(4, letters);
            return digitSegment + letterSegment;
          };
        
          const segment1 = getRandomChars(4, '0123456789');
          const segment2 = getRandomChars(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
          const segment3 = getRandomChars(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        
        res.send(`${segment1}-${segment2}-${segment3}`)
    }

}

module.exports = new EntryController;