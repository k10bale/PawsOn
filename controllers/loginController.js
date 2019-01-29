// what should I do with userSession 

const db = require("../models");
const Owner = require("../models/owner")
const userSession = require("../models/userSession")
// const pets = require("../models/pets")

// Defining methods for the loginController
module.exports = {

//************************************************************/
//* Allow users to self register
//************************************************************/
  signUp: (req, res) => {
   console.log("body = " + JSON.stringify(req.body));
    const { body } = req;
    const {
      firstName,
      lastName,
      password
    } = body;
    let { email } = body;




    if (!firstName) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify a first name.'
      });
    };
    if (!lastName) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify a last name.'
      });
    };
    if (!email) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify an email address.'
      });
    };
    if (!password) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify a password.'
      });
    };
    email = email.toLowerCase();
console.log("pass all checks")

    // checkExist: (req, res) => {
    db.Owner.find({
      email: email
    }, (err, exists) => {
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR:  Server error'
        });
      } else if (exists.length > 0) {
        return res.send({
          success: false,
          message: 'ERROR:  Account requested does not meet requriements'
        });
      };
    });
console.log("after db look up");

    const newOwner = new Owner();
    newOwner.email = email;
    newOwner.firstName = firstName;
    newOwner.lastName = lastName;
    newOwner.password = newOwner.generateHash(password);
    newOwner.save((err, Owner) => {
      console.log("err = " + err);
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR:  Server error'
        });
      }
      console.log("success?")
      return res.send({
        success: true,
        message: 'Signup complete!'
      });

    }
      // }
    )
  },



//************************************************************/
//* Process Owner Sign-in and create auth token for them
//************************************************************/
  signIn: (req, res) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    console.log("email = " + email + "  password = " + password);

    if (!email) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify an email address.'
      });
    };
    if (!password) {
      return res.send({
        success: false,
        message: 'ERROR: You must specify a password.'
      });
    };
    email = email.toLowerCase();
console.log('passed all checks');

    Owner.find({
      email: email
    }, (err, Owners) => {
//      console.log("Found Owner = " + Owners);
      if (err) {
        return res.send({
          success: false,
          message: 'ERROR:  Server error'
        });
      };
      if (Owners.length != 1) {
        return res.send({
          success: false,
          message: 'ERROR:  Unable to process login.'
        });
      };


      const Owner = Owners[0];
//      console.log("password supplied = " + password);
      if (!Owner.validPassword(password, Owner.password)) {
        return res.send({
          success: false,
          message: 'ERROR:  Invalid login.'
        });
      };


      const userSes = new userSession();
      userSes.ownerId = owner._id;
      userSes.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'ERROR:  Server error'
          });
        };


        return res.send({
          success: true,
          message: "User login is complete",
          token: doc._id,
          id: owner._id
        });
      });
    });
  },



//************************************************************/
//* Verify validity of a user's token if presented 
//************************************************************/
  verify: (req, res) => {
    const { body } = req;
    const { token } = body;
    // console.log(req);
    // console.log("Token = " + token);

    userSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        // console.log("fail 1");
        return res.send({
          success: false,
          message: "ERROR:  Unable to obtain user token."
        });
      };


      if (sessions.length != 1) {
        // console.log("Session length = " + sessions.length);
        return res.send({
          success: false,
          message: "ERROR:  Unable to verify session."
        });
      } else {
        // console.log("success 3");
        return res.send({
          success: true,
          message: "Successfully verified session token."
        });
      };
    });
  },



//************************************************************/
//* Process logout and invalidate user token in DB 
//************************************************************/
  logout: (req, res) => {
    const { query } = req;
    const { token } = query;

    userSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set:{isDeleted:true}
    }, null, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "ERROR:  Unable to obtain user token."
        });
      };

        return res.send({
          success: true,
          message: "Successfully logged out."
        });
      // };
    });
  },
};
