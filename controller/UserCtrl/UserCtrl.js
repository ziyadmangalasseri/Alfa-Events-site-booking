const userModel = require("../../model/userModel");

const homePage = (req, res) => {
  if (req.session.isLoggedIn) {
    res.render("user/home");
  }else{
    res.redirect("/");
  }
  console.log(req.session.isLoggedIn);
  
};


const profilePageDetails = async (req, res) => {
  try {
    // Ensure the user is logged in and session data is available
    const userId = req.session.userDataId;
    if (!userId) {
      return res.redirect("/"); // Redirect to login page if session is missing
    }

    // Fetch user details from the database
    const userDetails = await userModel.findById(userId);
    if (!userDetails) {
      return res.status(404).send("User not found");
    }

    // Render the profile page with user data
    res.render("user/profile", { users: userDetails });
  } catch (error) {
    console.error("Error in profilePageDetails:", error.message);
    res.status(500).send("Server error");
  }
};



module.exports = { homePage,profilePageDetails };
