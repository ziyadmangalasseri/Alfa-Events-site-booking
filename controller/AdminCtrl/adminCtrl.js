const dashboard = (req,res) => {
    try{
        res.render("admin/dashboard");
        // console.log("admin is ",req.session.adminisLoggedIn);
        // console.log("user is ",req.session.userisLoggedIn);
    }catch(err){
        console.error(err.message);
        
    }
}

module.exports = {dashboard}