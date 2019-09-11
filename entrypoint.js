const axios = require('axios');
const _ = require('lodash');
const { argv } = require('yargs');

const payload = {
    msgtype: 'text',
    text: {
      content: `${process.env.GITHUB_REPOSITORY}/${process.env.GITHUB_WORKFLOW} triggered by ${process.env.GITHUB_ACTOR} (${process.env.GITHUB_EVENT_NAME})`,
    }
};

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
