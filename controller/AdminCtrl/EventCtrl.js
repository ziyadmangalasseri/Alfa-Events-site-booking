const mongoose = require("mongoose");
const Event = require("../../model/EventSchema");
const Cron = require("node-cron");
const moment = require("moment");

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

    // Find the event and populate currentEmployers
    const event = await Event.findById(eventId).populate(
      "currentEmployers", // Field to populate
      "name userId" // Fields to include from the employees collection
    );

    if (event) {
      // Format the event's date
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

      // Format the event's expiration time
      if (event.expirationTime) {
        const expirationTime = new Date(event.expirationTime);
        event.formattedexpirationTime = expirationTime.toLocaleString(
          "en-IN",
          {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }
        );
      }
    }

    // Render the page with the event and populated employee details
    res.render("admin/eventDetailsPage", { event });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



const EditEventPage = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(400)
        .json({ success: false, message: "Event is not found" });
    }

    // Format dates
    event.formattedDate = moment(event.date).format("YYYY-MM-DD");
    event.formattedexpirationTime = moment(event.expirationTime).format(
      "YYYY-MM-DDTHH:mm"
    );

    res.render("admin/editEventPage", { event });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


Cron.schedule("0 0 * * *", async () => {
  const now = Date.now();
  console.log(
    `cron job is working is running at :${new Date(now).toLocaleString()}`
  );

  try {
    const expiredEvent = await Event.find({ expirationTime: { $lt: now } });
    console.log(expiredEvent);

    const result = await Event.deleteMany({ expirationTime: { $lt: now } });

    console.log(`${result.deletedCount} expired Event deleted success`);
  } catch (error) {
    console.error("Error Expired Event deleting", error);
  }
});
const AddEvent = async (req, res) => {
  const adminId = req.session.userDataId;
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
    const formattedExpirationTime = new Date(expirationTime);
    const newEvent = new Event({
      place: place,
      date: date,
      reportingTime: reportingTime,
      exitTime: exitTime,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      employerLimit: employerLimit,
      expirationTime: formattedExpirationTime,
     
      // expirationTime: new Date(expirationTime)
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const EditEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
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

    const newEvent = await Event.findByIdAndUpdate(eventId, {
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
    res
      .status(200)
      .json({
        success: true,
        message: "Event successfully edited",
        redirectUrl: "/showEventPage",
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const DeleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id; // Extract the employee ID from the URL
    if (!eventId) {
      return res.status(400).json({ error: "Invalid event ID" });
    }

    // Find and delete the employee
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: "event not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

module.exports = {
  AddEvent,
  AddEventPage,
  ShowEventPage,
  EventdetailsPage,
  EditEventPage,
  EditEvent,
  DeleteEvent,
};
