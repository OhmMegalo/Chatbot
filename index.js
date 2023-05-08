'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "H71mZILVvhOW6ULyq896jZL5L26ZWff7A9D/wga+cUf/TMjGMpxgECMx607absx8wBQZ7NZmlGky6t00lwbmUZfSvtmV3Few5p06FCz/zdnjn3l0guXcVvBYIAaJILMNAmigSUi8tzMu5MIzGv/JPwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "85bc8d2385376eba92066f9e9a8d46eb5",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  } else if (event.message.type==='text' && event.message.text === 'Hello'){
    const payload ={
      type: "text",
      text: "สวัสดีครับ พิมพ์คำสั่งที่ต้องการได้เลยครับ"

    };

  return client.replyMessage(event.replyToken, payload);

}else if (event.message.type==='text' && event.message.text === 'on'){
    const payload ={
      type: "text",
      text: "OK Relay1 ติดแล้วนะจ๊ะ"

    };
  axios.get('https://blynk.cloud/external/api/update?token=KK5xE_GTg0Bz-xRKrFWLX2Mdi1gs-DlG&v1=1');
  return client.replyMessage(event.replyToken, payload);

  }else if (event.message.type==='text' && event.message.text === 'off'){
      const payload ={
        type: "text",
        text: "OK Relay1 ดับแล้วนะจ๊ะ"

      };
    axios.get('https://blynk.cloud/external/api/update?token=KK5xE_GTg0Bz-xRKrFWLX2Mdi1gs-DlG&v1=0');
    return client.replyMessage(event.replyToken, payload);

    }

  // create a echoing text message
  //const echo = { type: 'text', text: event.message.text };

  // use reply API
  //return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
