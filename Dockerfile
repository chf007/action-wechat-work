FROM mhart/alpine-node:10.15.1

LABEL "com.github.actions.name"="GitHub Action for WeChat Work"
LABEL "com.github.actions.description"="Outputs a message to WeChat Work."
LABEL "com.github.actions.icon"="hash"
LABEL "com.github.actions.color"="red"

LABEL "repository"="https://github.com/chf007/action-wechat-work"
LABEL "homepage"="https://github.com/chf007/action-wechat-work"
LABEL "maintainer"="chf007 <chf007server@gmail.com>"
LABEL "version"="0.0.1"

ADD entrypoint.js package.json package-lock.json /
RUN npm ci
RUN chmod +x /entrypoint.js

ENTRYPOINT ["node", "/entrypoint.js"]
