const User = require(`../../models/User.js`);

const connectDB = require('../../utils/connectDB.js');

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    const userFromDB = await User.findOne({ email: email });
    console.log(userFromDB);
    res.json(userFromDB);
  }
}
