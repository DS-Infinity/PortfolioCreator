const User = require(`../../models/User.js`);

const mongoose = require('mongoose');

const connectDB = require('../../utils/connectDB.js');

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
  }
}
