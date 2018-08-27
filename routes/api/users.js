const express = require('express');
const router = express.Router();

//User Model
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
//@route GET api/users
//@desc Get Userinfo
//@access Public

router.get('/', (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(items =>res.json(items))
});

//@route Post api/users
//@desc Create a Post
//@access Public

// router.post('/', (req, res) => {
//   if(req.body.isLogin== true) {
//     User.find({email:req.body.email,password:req.body.password})
//       .then(item => res.json({success: true}))
//       .catch(err => res.json({success: false}));
//   } else {
//     const newUser = new User({
//       email: req.body.email,
//       password: req.body.password
//     });
   
//     newUser.save().then(() => res.json({success: true}));
//   }
// });

router.post('/signup', ( req, res, next ) => {
  console.log(req.body);
  const { body } = req;
  const {
    firstName,
    lastName,
    password
  } = body ;

  let { email } = body;

  if(!firstName) {
    return res.send({
      success: false,
      messsage: 'Error: First name can not be black.'
    });
  }
  if(!lastName) {
    return res.send({
      success: false,
      messsage: 'Error: Last name can not be black.'
    });
  }

  if(!email) {
    return res.send({
      success: false,
      messsage: 'Error: Email name can not be black.'
    });
  }

  if(!password) {
    return res.send({
      success: false,
      messsage: 'Error: Password name can not be black.'
    });
  }

  email = email.toLowerCase();

 //Steps:
  //1. Verify email dosn't exist
  //2. Save
  User.find({
    email: email
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    } else if(previousUsers.length > 0){
      return res.send({
        success: false,
        message: 'Error: Account aleady exist.'
      });
    }
  // Save the new user
    const newUser = new User();

    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Signed up'
      });
    })
  })
});

router.post('/login', ( req, res, next ) => {
  const { body } = req;
  const {
    password
  } = body ;
  let {
    email
  } = body;

  if(!email) {
    return res.send({
      success: false,
      messsage: 'Error: Email name can not be black.'
    });
  }

  if(!password) {
    return res.send({
      success: false,
      messsage: 'Error: Password name can not be black.'
    });
  }

  email = email.toLowerCase();

  User.find({
    email: email
  }, (err, users) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: server error'
      });
    }
    if(users.length != 1) {
      return res.send({
        success: false,
        message:'Error Invaild'
      });
    }

    const user = users[0];
    console.log(user);
    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message:'Error Invaild'
      });
    }

    // Otherwise correct user
    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, doc) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      console.log(doc);
      return res.send({
        success: true,
        message: 'Valid signin',
        token: doc._id
      })
    })
  });
});

router.get('/logout', (req, res, next ) => {
  //Get the token
  const { query } = req;
  const { token } = query;
   //Verify the token is one of a kind and it's not detected.

  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
    $set:{isDeleted:true}
  }, null, (err, sessions) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: Server errror'
      });
    }
    
      return res.send({
        success: true,
        message: 'Good'
      });
  });
});

module.exports = router;