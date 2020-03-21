const asynchandler = require('../middleware/async');
const Message = require('../models/Message');

exports.getPatientMessages = asynchandler(async (req, res, next) => {
  const patientId = req.params.patientId;

  const messages = await Message.find({
    $or: [{ to: patientId }, { from: patientId }]
  }).populate({
    path: 'to from',
    select: 'name'
  });

  res.status(200).json({
    success: true,
    data: messages
  });
});

exports.getDoctorMessages = asynchandler(async (req, res, next) => {
  const doctorId = req.params.doctorId;
  const patientId = req.params.patientId;

  const messages = await Message.find({
    $or: [
      {
        $and: [{ to: doctorId }, { from: patientId }]
      },
      {
        $and: [{ to: patientId }, { from: doctorId }]
      }
    ]
  }).populate({
    path: 'to from',
    select: 'name'
  });

  // $and: [
  //   { $or: [{ to: doctorId }, { from: patientId }] },
  //   { $or: [{ from: doctorId }, { to: patientId }] }
  // ]

  res.status(200).json({
    success: true,
    data: messages
  });
});

exports.getAllMessages = asynchandler(async (req, res, next) => {
  const messages = await Message.find();

  res.status(200).json({
    success: true,
    data: messages
  });
});

exports.saveUserMessages = asynchandler(async (req, res, next) => {
  const message = await Message.create(req.body);

  res.status(201).json({
    success: true,
    data: message
  });
});
