// what should I do with userSession 
const jwt = require("jsonwebtoken")
const db = require("../models");
const Owner = require("../models/owner")
const userSession = require("../models/userSession")
// const pets = require("../models/pets")

// Defining methods for the loginController
module.exports = {

//************************************************************/
//* Allow users to self register
//************************************************************/
signUp: async(req, res) => {
  let {
    firstName,
    lastName,
    password,
    email
  } = req.body;

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

  const ownerExists = await Owner.findOne({email: email})
  if (ownerExists) {
    return res.status(409).json({
      status: 409,
      message: 'User already exists'
    });
  }
 try {
  const owner = new Owner();
  owner.email = email;
  owner.firstName = firstName;
  owner.lastName = lastName;
  owner.password = owner.generateHash(password);

  const newOwner = await owner.save();
  if (newOwner) {
    const token = jwt.sign(
      {
        id: newOwner._id,
        username: newOwner.firstName,
        email: newOwner.email
      },
      'secretKey',
      { expiresIn: 24 * 60 * 60 }
    );
    return res.status(201).send({
      message: `Welcome!! ${firstName}`,
      user: newOwner,
      token
    });
  }
 } catch (error) {
  res.status(500).json(error)
 }
},
//************************************************************/
//* Process Owner Sign-in and create auth token for them
//************************************************************/
signIn: async (req, res) => {
  let { email, password } = req.body;
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
  try {
    const owner = await Owner.findOne({ email: email })

    if (owner && owner.validPassword(password, owner.password)) {
    
      const token = jwt.sign({
      email: owner.email,
      userId: owner._id,
    }, "secretKey", { expiresIn: 86400 });
    return res.status(200).send({
      token,
      owner: {
        id: owner._id,
        email: owner.email
      },
      message: `Welcome back ${owner.firstName}`
    });
  }
  return res.status(401).json({
    errors:
      { message: 'Failed to authenticate user' }
  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error })
  }
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
      // PROBLEM AREA //////////////////////////////////////////
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
