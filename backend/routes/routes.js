const User = require('../models/User');
const router = require('express').Router();
const mongoose = require('mongoose');
const cors = require('../cors');

// router.use(cors);

// router.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');

//   if (req.method == 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
// });

// router.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
//   );

//   if (req.method == 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }
//   next();
// });

router.post('/create', async (req, res) => {
  const user = req.body;
  if (user) {
    const userFromDB = await User.findOne({
      email: user.email,
    }).catch((err) => console.log('==> User not found.'));
    console.log(user, userFromDB);
    if (userFromDB) {
      console.log('==> User already in DB, so new instance is not created.');
      res.json({
        message: 'User is already in DB, so new instance is not created.',
      });
      return;
    }
    const newUser = await new User({
      email: user.email,
      accountCreationDate: new Date().getTime(),
    }).save();
    res.json({ action: 'Create user', newUser });
    return;
  }
  res.json({ action: 'Create user', message: 'User signed out.' });
});

router.post('/getURL', async (req, res) => {
  console.log('==> getURL');
  // console.log(req.headers);
  // console.log(req.body);
  const { url } = req.body;
  console.log(`==> url: ${url}`);
  // const userFromDB = await User.findOne({ url: url });
  // console.log(userFromDB);
  // res.json(userFromDB);
});

router.post('/get', async (req, res) => {
  const { email } = req.body;
  const userFromDB = await User.findOne({ email: email });
  console.log(userFromDB);
  res.json(userFromDB);
});

router.post('/update', async (req, res) => {
  const user = req.body;
  const { email } = req.body;

  // const userFromDB = await User.findOne({ email }).lean();

  await User.findOneAndUpdate(
    { email },
    {
      image: user.image,
      phone: user.phone,
      address: user.address,
      profession: user.profession,
      aboutMe: user.aboutMe,
      skills: user.skills,
      projects: user.projects,
    }
  ).lean();

  res.json({ done: 'yes' });
});

module.exports = router;
