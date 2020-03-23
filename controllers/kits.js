const Kit = require('../models/Kit');
const asyncHandler = require('../middleware/async');

exports.getAllKits = asyncHandler(async (req, res, next) => {
  const kits = await Kit.find();

  res.status(200).json({
    success: true,
    data: kits
  });
});

//Get a single kit by its ID
exports.getKitById = asyncHandler(async (req, res, next) => {});

// Get all user kits
//Path eg: /kits/5e675d0fae03022bb8411b8a
exports.getKitsByUserId = asyncHandler(async (req, res, next) => {
  const kit = await Kit.find({ user_id: req.params.userId });

  // if (!kit)
  //   return res.status(400).json({
  //     success: false,
  //     message: 'Error processing your request.'
  //   });

  res.status(200).json({
    success: true,
    data: kit
  });
});

/*
  Body args: 
    serial
    user_id
    type?
*/
exports.registerKit = asyncHandler(async (req, res, next) => {
  let kit = await Kit.findOne({ serial: req.body.serial });

  if (kit)
    return res.status(400).json({
      success: false,
      message: 'A kit with that serial has already been registered.'
    });

  kit = await Kit.create(req.body);

  res.status(200).json({
    success: true,
    data: kit
  });
});
