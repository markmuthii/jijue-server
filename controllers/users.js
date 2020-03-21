const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const Role = require('../models/Role');
const Message = require('../models/Message');
const mongoose = require('mongoose');
exports.getAllUsers = asyncHandler(async (req, res, next) => {});

exports.getUsersByRoleName = asyncHandler(async (req, res, next) => {
  const roleName = req.params.roleName;

  const role = await Role.findOne({ name: roleName });

  const roleId = role._id;

  const users = await User.find({ role: roleId }).populate({
    path: 'role',
    select: 'name'
  });

  res.status(200).json({
    success: true,
    data: users
  });
});

exports.getDoctorsPatients = asyncHandler(async (req, res, next) => {
  function unique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const doctorId = req.params.doctorId;

  const uniquePatientIds = await Message.distinct('from', {
    to: doctorId
  });

  console.log('Unique patients: ', uniquePatientIds);

  const patients = await User.find({ _id: { $in: uniquePatientIds } });

  res.status(200).json({
    success: true,
    data: patients
  });

  // res.send(uniquePatientIds);
});

exports.updateUser = asyncHandler(async (req, res, next) => {});
