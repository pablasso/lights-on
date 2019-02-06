# Lights-on

This proof of concept consists of:

- Detects if lights are turned ON or OFF.
- If a change was detected, persist it in a DB.

![ambient.gif](ambient.gif)

## Install

I've made use of [Tessel 2](http://tessel.github.io/t2-start/), [Webtask](https://webtask.io/) and [mLab](https://mlab.com/). The latest two have free accounts and are used to persist the data.

- To run the tessel code:

`t2 run ambient.js`

- For the server side code I'm using the code at `server.js` for a webtask endpoint.
