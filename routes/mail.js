var nodemailer = require('nodemailer');
require("dotenv").config();
var express = require("express");
var router = express.Router();

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL_SMTP_USERNAME,
        pass: process.env.EMAIL_SMTP_PASSWORD
    }
});

/* send email message */
router.post("/", function(req, res) {
    let {email, firstName, lastName, additional, phoneNumber} = req.body;  

    console.log(email, firstName, lastName, additional)

    var mailOptions = {
        from: process.env.EMAIL_SMTP_USERNAME,
        to: email,
        subject: 'website query ' + email,
        text: `
            email - ${email}
            phone - ${phoneNumber}
            ${firstName}  ${lastName}
            ${additional ? additional : 'No message'}
        `
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.end("ERROR ERROR ISAEL " + error);
        } else {
          res.end('Email sent: ' + info.response);
          
        }
    });

});

module.exports = router;
