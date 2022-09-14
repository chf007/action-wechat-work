const axios = require('axios');

const payload = {};

if (process.env.INPUT_MSGTYPE === 'text') {

  payload.msgtype = process.env.INPUT_MSGTYPE;

  if (!process.env.INPUT_CONTENT) {
    console.log(`[action-wechat-work] INPUT_CONTENT is blank: ${process.env.INPUT_CONTENT}`);
  }

  payload.text = {
    content: process.env.INPUT_CONTENT,
  };

  if (process.env.INPUT_MENTIONED_LIST) {
    let mentioned_list;
    try {
      mentioned_list = JSON.parse(process.env.INPUT_MENTIONED_LIST);
    } catch (error) {
      mentioned_list = [];
      console.log(`[action-wechat-work] INPUT_MENTIONED_LIST JSON.parse error: ${error}, JSON string: ${process.env.INPUT_MENTIONED_LIST}`);
    }
    payload.text.mentioned_list = mentioned_list;
  }

  if (process.env.INPUT_MENTIONED_MOBILE_LIST) {
    let mentioned_mobile_list;
    try {
      mentioned_mobile_list = JSON.parse(process.env.INPUT_MENTIONED_MOBILE_LIST);
    } catch (error) {
      mentioned_mobile_list = [];
      console.log(`[action-wechat-work] INPUT_MENTIONED_MOBILE_LIST JSON.parse error: ${error}, JSON string: ${process.env.INPUT_MENTIONED_MOBILE_LIST}`);
    }
    payload.text.mentioned_mobile_list = mentioned_mobile_list;
  }

}

if (process.env.INPUT_MSGTYPE === 'markdown') {

  payload.msgtype = process.env.INPUT_MSGTYPE;

  if (!process.env.INPUT_CONTENT) {
    console.log(`[action-wechat-work] INPUT_CONTENT is blank: ${process.env.INPUT_CONTENT}`);
  }

  payload.markdown = {
    content: process.env.INPUT_CONTENT,
  };

}

if (process.env.INPUT_MSGTYPE === 'image') {

  payload.msgtype = process.env.INPUT_MSGTYPE;

  if (!process.env.INPUT_BASE64) {
    console.log(`[action-wechat-work] INPUT_BASE64 is blank: ${process.env.INPUT_BASE64}`);
  }

  if (!process.env.INPUT_MD5) {
    console.log(`[action-wechat-work] INPUT_MD5 is blank: ${process.env.INPUT_MD5}`);
  }

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
    console.log(`[action-wechat-work] INPUT_ARTICLES JSON.parse error: ${error}, JSON string: ${process.env.INPUT_ARTICLES}`);
  }
  payload.news = {
    articles,
  };

}

if (process.env.INPUT_MSGTYPE === 'file') {

  payload.msgtype = process.env.INPUT_MSGTYPE;

  if (!process.env.INPUT_MEDIA_ID) {
    console.log(`[action-wechat-work] INPUT_MEDIA_ID is blank: ${process.env.INPUT_MEDIA_ID}`);
  }

  payload.file = {
    media_id: process.env.INPUT_MEDIA_ID,
  };

}

if (process.env.INPUT_MSGTYPE === 'template_card') {

  payload.msgtype = process.env.INPUT_MSGTYPE;

  let template_card;
  try {
    template_card = JSON.parse(process.env.INPUT_TEMPLATE_CARD);
  } catch (error) {
    template_card = {};
    console.log(`[action-wechat-work] INPUT_TEMPLATE_CARD JSON.parse error: ${error}, JSON string: ${process.env.INPUT_TEMPLATE_CARD}`);
  }
  payload.template_card = template_card;

}

console.log('[action-wechat-work] The message content in JSON format...', JSON.stringify(payload));

const url = process.env.WECHAT_WORK_BOT_WEBHOOK;

(async () => {
    console.log('[action-wechat-work] Sending message ...');
    await axios.post(url, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    console.log('[action-wechat-work] Message sent Success! Shutting down ...');
    process.exit(0);
})()
    .catch((err) => {
        console.error('[action-wechat-work] Message sent error:');
        err.message && console.error(`[action-wechat-work] err.message: ${err.message}`);
        err.response && err.response.data && console.error(`[action-wechat-work] err.response.data: ${err.response.data}`);
        process.exit(1);
    });
