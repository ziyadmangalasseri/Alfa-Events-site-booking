const mongoose = require("mongoose");
const Event = require("../../model/EventSchema");
const Cron = require("node-cron");

const AddEventPage = async (req, res) => {
  try {
    res.render("admin/addEvent");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const ShowEventPage = async (req, res) => {
  try {
    const event = await Event.find();

    event.forEach((event) => {
      const date = new Date(event.date);
      event.formattedDate = date.toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    });
    res.render("admin/showEventPage", { event });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

const EventdetailsPage = async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid event id" });
    }
    const event = await Event.findById(eventId);

    if (event) {
      const date = new Date(event.date);
      event.formattedDate = date.toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    if (event.expirationTime) {
      const expirationTime = new Date(event.expirationTime);
      event.formattedexpirationTime = expirationTime.toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    res.render("admin/eventDetailsPage", { event });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

Cron.schedule("0 0 * * *", async () => {
  const now = Date.now();
  try {
    const result = await Event.deleteMany({ expirationtime: { $lt: now } });
    console.log(`${result.deletedCount} expired Event deleted success`);
  } catch (error) {
    console.error("Error Expired Event deleting", error);
  }
});
const AddEvent = async (req, res) => {
  try {
    const {
      place,
      date,
      reportingTime,
      exitTime,
      jobTitle,
      jobDescription,
      employerLimit,
      expirationTime,
    } = req.body;
    const newEvent = new Event({
      place: place,
      date: date,
      reportingTime: reportingTime,
      exitTime: exitTime,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      employerLimit: employerLimit,
      expirationTime: expirationTime,
    });
    await newEvent.save();
    res
      .status(200)
      .json({
        success: true,
        message: "new Event successfully created",
        redirectUrl: "/addEventPage",
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = { AddEvent, AddEventPage, ShowEventPage, EventdetailsPage };
