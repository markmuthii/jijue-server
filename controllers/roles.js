const asyncHandler = require('../middleware/async');
const Role = require('../models/Role');

exports.addUserRole = asyncHandler(async (req, res, next) => {
  const role = await Role.create(req.body);

  res.status(201).json({
    success: true,
    data: role
  });
});

exports.getUserRoles = asyncHandler(async (req, res, next) => {
  const roles = await Role.find();

  res.status(200).json({
    success: true,
    data: roles
  });
});
