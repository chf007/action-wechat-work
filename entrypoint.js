const axios = require('axios');
const _ = require('lodash');
const { argv } = require('yargs');

const payload = {};

if (process.env.INPUT_MSGTYPE === 'text') {

  payload.msgtype = process.env.INPUT_MSGTYPE;
  payload.text = {
    content: process.env.INPUT_CONTENT,
  };

  if (process.env.INPUT_MENTIONED_LIST) {
    let mentioned_list;
    try {
      mentioned_list = JSON.parse(process.env.INPUT_MENTIONED_LIST);
    } catch (error) {
      mentioned_list = [];
    }
    payload.text.mentioned_list = mentioned_list;
  }

  if (process.env.INPUT_MENTIONED_MOBILE_LIST) {
    let mentioned_mobile_list;
    try {
      mentioned_mobile_list = JSON.parse(process.env.INPUT_MENTIONED_MOBILE_LIST);
    } catch (error) {
      mentioned_mobile_list = [];
    }
    payload.text.mentioned_mobile_list = mentioned_mobile_list;
  }

}

if (process.env.INPUT_MSGTYPE === 'markdown') {

  payload.msgtype = process.env.INPUT_MSGTYPE;
  payload.markdown = {
    content: process.env.INPUT_CONTENT,
  };

}

if (process.env.INPUT_MSGTYPE === 'image') {

  payload.msgtype = process.env.INPUT_MSGTYPE;
  payload.image = {
    base64: process.env.INPUT_BASE64,
    md5: process.env.INPUT_MD5,
  };


}

if (process.env.INPUT_MSGTYPE === 'news') {

  payload.msgtype = process.env.INPUT_MSGTYPE;

  let articles;
  try {
    articles = JSON.parse(process.env.INPUT_ARTICLES);
  } catch (error) {
    articles = [];
  }
  payload.news = {
    articles,
  };

}

console.log('The message content in JSON format...');
console.log(JSON.stringify(payload));

const url = process.env.WECHAT_WORK_BOT_WEBHOOK;

(async () => {
    console.log('Sending message ...');
    await axios.post(url, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    console.log('Message sent ! Shutting down ...');
    process.exit(0);
})()
    .catch((err) => {
        console.error(err.message);
        console.error('Message :', err.response.data);
        process.exit(1);
    });
