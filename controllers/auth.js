const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

exports.registerUser = asyncHandler(async (req, res, next) => {
  //Check for the email
  let user = await User.findOne({ email: req.body.email });

  if (user)
    return res
      .status(200)
      .json({ success: false, message: 'Email already exists.' });

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  req.body.password = hashedPass;

  const role = await Role.findOne({ name: req.body.role });

  req.body.role = role._id;

  user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      role: role.name
    }
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  //Check for the email
  const user = await User.findOne({ email: req.body.email }).populate({
    path: 'role',
    select: 'name'
  });

  if (!user)
    return res
      .status(200)
      .json({ success: false, message: 'Email or password is incorrect.' });

  //Check for valid password
  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass)
    return res
      .status(200)
      .json({ success: false, message: 'Email or password is incorrect.' });

  res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      role: user.role.name
    }
  });
});
