var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {

  var toEmail= req.query.toEmail;
  var subject = req.query.subject;

  var dataContact = { email: req.query.fromEmail,
                      name: req.query.toName,
                      message: req.query.toMessage }

  app.mailer.send('notifier', {
    to: [toEmail],
    subject: subject,
    data: dataContact
  }, function (err) {
    console.log('Ocurrio un Error', err);
  });

});

module.exports = router;