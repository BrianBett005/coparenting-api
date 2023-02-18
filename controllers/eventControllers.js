const Event = require("../models/Event");
const User = require("../models/User");

const createEvent = async (req, res) => {
  req.body.user = req.user.userId;
  const event = await Event.create(req.body);
  res.status(200).json(event);
};

const getEvents = async (req, res) => {
  const currentUser = await User.findById(req.user.userId);
  const events = await Event.find({
    $or: [{ user: req.user.userId }, { user: currentUser?.coparent }],
  })
    .populate("user")
    .sort("-createdAt");
  res.status(200).json(events);
};
const updateEvent = async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(updated);
};
module.exports = {
  createEvent,
  getEvents,
  updateEvent,
};