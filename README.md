# WeChat Work for GitHub Actions

Sends a WeChat Work notification. Simple as that.

![WeChat Work Logo](wechat-work-logo.png "WeChat Work Logo")

*Appearance on WeChat Work :*

![WeChat Work message](action-message.png "WeChat Work message")

<hr/>

## Usage

```hcl
action "WeChat Work notification" {
  uses = "chf007/action-wechat-work@master"
  secrets = ["WECHAT_WORK_BOT_WEBHOOK"]
}
```

### Secrets

* **`WECHAT_WORK_BOT_WEBHOOK`**: the WeChat Work webhook URL (**required**, see https://work.weixin.qq.com/api/doc#90000/90136/91770).
* That's all.
