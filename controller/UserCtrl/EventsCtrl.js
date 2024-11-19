const mongoose = require("mongoose");
const Event = require("../../model/EventSchema");
const User = require("../../model/userModel");
const showEvents = async (req, res) => {
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
      res.render("user/upcomingEvents", { event });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal Server error" });
    }
  };

  const userEventDetails = async (req, res) => {
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
  
      res.render("user/eventDetails", { event });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  
  const bookEvent = async (req, res) => {
    try {
      const eventId = req.params.id; // Extract the event ID from the request params
      const userId = req.session?.userId; // Assuming userId is stored in session
  
      if (!userId || !eventId) {
        return res.status(400).json({ error: "Missing required data: Event ID or User ID" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid Event ID format" });
      }
  
      // Use userId field instead of _id
      const user = await User.findOneAndUpdate(
        { userId }, // Find by custom userId
        { $addToSet: { myEvents: eventId } }, // Add eventId to myEvents
        { new: true } // Return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ success: true, message: "Event booked successfully", user });
    } catch (error) {
      console.error("Error in bookEvent:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

module.exports = {showEvents,userEventDetails,bookEvent};