const User = require(`../../models/User.js`);

const mongoose = require('mongoose');

const connectDB = require('../../utils/connectDB.js');

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
  }
}
