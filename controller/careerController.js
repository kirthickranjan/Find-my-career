const path = require('path');



exports.getCareerLib = (req,res) =>{
    return res.render("career_lib")
}


exports.getCareer = (req,res) =>{
    return res.render(`career_lib_${req.params.data}`);
    //res.sendFile(path.join(__dirname+`/../public/career_lib_${req.params.data}.html`));
}
