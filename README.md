# Shotio
##### Opinionated screenshot tool 'n' scheduler 'n' performance visualiser

Docker headless chrome screenshots and page speed insights

Ideally if this project will ever see the light, it will be made up of:
- Node backend
- React & Redux
- Websocket to be blazing fast
- As much ES6 as possible
- Chrome headless for screenshots and network stats
- YSlow for detailed insights
- Long term storage (perhaps S3 or filesystem)
- Docker to glue everything together
- JSON API endpoints for setting / getting / running tasks & stats 


As now, it's a mix of:
- https://github.com/davezuko/react-redux-starter-kit
- https://github.com/schnerd/chrome-headless-screenshots
- https://github.com/cyrus-and/chrome-remote-interface
- https://github.com/yukinying/chrome-headless-browser-docker
- https://github.com/socketio/socket.io

#### How to run it

`docker-compose up`

Done. Easy. Launch `http://localhost:3000/`

#### How to stop it

Ctrl + C, or:

`docker-compose down`