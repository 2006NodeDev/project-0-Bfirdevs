var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env['EMAIL'],
        pass: process.env['PASSWORD']
    }
});
var messageTemplate = {
    from: process.env['EMAIL'],
    to: '',
    subject: 'Welcome to Uzungol Cabins',
    text: 'I hope you enjoy your virtual tour'
};
/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.newUserEmail = function (event, context) {
    var newUser = JSON.parse(Buffer.from(event.data, 'base64').toString());
    messageTemplate.to = newUser.email;
    transporter.sendMail(messageTemplate);
};
/*

// for testing the function by mimicing a pub event
let payload = {
    username: 'firdevs',
    jobTitle: 'Cloud Developer',
    email: 'firdevssyildirimm@gmail.com'
}

// to mimic the event
let event = {
  data: Buffer.from (JSON.stringify(payload), 'binary')
}

exports.newUserEmail(event)

*/ 
//# sourceMappingURL=index.js.map