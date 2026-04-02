const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGODB_URI, { dbName: 'farm-management' })
  .then(async () => {
    const User = require('./models/user.model');
    const users = await User.find({});
    console.log("Users in DB:");
    users.forEach(u => console.log(`- Name: ${u.name}, Phone: ${u.phone}, Email: ${u.email}`));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
