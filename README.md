# Shotio
##### Opinionated screenshot scheduler and performance visualiser

Docker headless chrome screenshots and page speed insights

Ideally this will be made up of chrome headless for screenshots,
storage them on s3 (or maybe just plain fs), react-redux on frontend
(yslow to get insights about the page maybe?), node on backend as schedule
... and if I wanna really think big maybe grafana and influxdb? (wow that's a lot)


Frontend bootstrap is coming from https://github.com/davezuko/react-redux-starter-kit


Dev


docker run --rm --name redis -d redis
docker run --init -it --rm --name chrome --shm-size=1024m -p=127.0.0.1:9222:9222 --name chrome --cap-add=SYS_ADMIN yukinying/chrome-headless-browser