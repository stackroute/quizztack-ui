var express = require('express');
var app = express();
var userRoute = require('./controller/index.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var path = require('path');


var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
var Schema = mongoose.Schema;
// var socket;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
// //   // we're connected!
// });

// io.sockets.on('connection',function(socket){
//   console.log('socket connection established here!!!!');


// });
// sockets.on('queue')
// io.use(function(sockets, next) {
//   // var token = sockets.handshake.query.toke
//   var token = JSON.parse(localStorage['token']),
//               decodedToken;
//    try {
//       decodedToken = jwt.verify(token, "Quizztack");
//       console.log("token valid for user", decodedToken.name);
//       sockets.connectedUser = decodedToken.name;
//       sockets.emit('connected', sockets.connectedUser);
//       next();
//     } catch (err) {
//         console.log(err);
//         next(new Error("not valid token"));
//         //socket.disconnect();
//     }
//   });

  // io.on('connection', socket);

var init  = require('./server/gameController/gameController');

init(io);


/*server.listen(8081, function() {
	console.log('yes its listening');
});
*/


if (process.env.NODE_ENV !== 'production') {
  const logger = require('morgan');
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.config.js')
  const compiler = webpack(config)

  app.use(logger('dev'));
  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

// io.on('connection', function(socket) {
// 	console.log('server connected to socket');
// 	socket.emit('news', {hello: 'world'});
// 	socket.on('my other event', function(data) {
// 		console.log(data);
// 	});
// });

app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use('/login',userRoute);
app.use('/',userRoute);
app.use('/signin',userRoute);
server.listen('8081',function(){
  console.log('Application is listening on port 8081');
});
