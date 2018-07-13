Chatty
=====================

A single-page chat-room built using React and WebSockets.

## Features

* Messages are sent and broadcasted to all connected users.
* Displays the number of connected users.
* Users can send pictures using links.

 #### Future update
 
 * Users will be assigned a color.

## Screenshots of final product

!["Screenshot of Chatty App"](https://github.com/NicholasLepage/ChattyApp/blob/master/docs/Chatty1.png)
!["Scrolling"](https://github.com/NicholasLepage/ChattyApp/blob/master/docs/Peek%202018-07-13%2013-07.gif)
!["Empty message/Username"](https://github.com/NicholasLepage/ChattyApp/blob/master/docs/Peek%202018-07-13%2013-11__2.gif)
!["Gif sending"](https://github.com/NicholasLepage/ChattyApp/blob/master/docs/Peek%202018-07-13%2014-27_img.gif)


Installation
======================

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

Open a WebSocket server by going into the chatty_server directory.

```
npm install
npm start
```

### Dependencies

* React
* Webpack
* Express
* ws
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
