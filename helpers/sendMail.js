const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user:"mosettsu@hotmail.com",
        pass: "moselaestampida777"
    },
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    tls: {
        rejectUnauthorized: false
    }
})

const getOptions = (params) => {
    return {
        from: "mosettsu@hotmail.com",
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