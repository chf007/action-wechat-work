FROM mhart/alpine-node:10.15.1

LABEL "com.github.actions.name"="GitHub Action for WeChat Work"
LABEL "com.github.actions.description"="Send WeChat Work message. Run on any operating platform, such as Windows, Linux, Mac supported by GitHub"
LABEL "com.github.actions.icon"="message-circle"
LABEL "com.github.actions.color"="red"

LABEL "repository"="https://github.com/chf007/action-wechat-work"
LABEL "homepage"="https://github.com/chf007/action-wechat-work"
LABEL "maintainer"="chf007 <chf007server@gmail.com>"
LABEL "version"="1.0.0"

ADD entrypoint.js package.json package-lock.json /
RUN npm ci
RUN chmod +x /entrypoint.js

ENTRYPOINT ["node", "/entrypoint.js"]
