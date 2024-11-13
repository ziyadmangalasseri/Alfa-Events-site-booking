const Employee = require("../../model/userModel");
const Cron = require("node-cron");
const Event = require("../../model/EventSchema");
const AddEventPage = async (req, res) => {
  try {
    res.render("admin/addEvent");
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
      place,
      date,
      reportingTime,
      exitTime,
      jobTitle,
      jobDescription,
      employerLimit,
      expirationTime,
    });

    await newEvent.save();

    res.status(200).json({
      success: true,
      message: "New event successfully created",
      redirectUrl: "/dashboard", // Update this URL as per your redirection needs
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { AddEvent, AddEventPage };
