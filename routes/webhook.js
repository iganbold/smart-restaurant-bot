var express = require('express');
var router = express.Router();

/* GET fb webhook listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

router.post('/', (req,res)=> {
  let data = req.body;
  if(data.object === 'page') {
    data.entry.forEach((entry)=> {
      let pageID = entry.id;
      let timeOfEvent = entry.time;

      entry.messaging.forEach((event) => {
        if(event.messaging) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    res.sendStatus(200);
  }
});

function receivedMessage(event) {
  // Putting a stub for now, we'll expand it in the following steps
  console.log("Message data: ", event.message);
}

module.exports = router;
