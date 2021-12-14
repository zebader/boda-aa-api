const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    },
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    tls: {
        rejectUnauthorized: false
    }
})

const getOptions = (params) => {
    return {
        from: process.env.EMAIL,
        to: params.to,
        subject: params.subject,
        html: params.html
    }
}

exports.sendMail = (params) => {
    transporter.sendMail(getOptions(params), function(error,info) {
        if(error) {
            console.log(error);
        } else {
            console.log("Mail sent succesfully: ", info.response);
        }
    })
  };