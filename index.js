'use strict';

var http = require('http'),
    express = require('express'),
    path = require('path');

var app = express();

var server = require('http').createServer(app);

app.set('port', process.env.PORT || 4000);

app.use(require('prerender-node'));

app.use(require('prerender-node').set('prerenderToken', 'Y9LEIzcfgF1RdnpglMLf'));

app.use(require('prerender-node').set('afterRender', function(err, req, prerender_res) {
    // do whatever you need to do 
    console.log("Page successfully rendered")
}))

app.use(express.static(path.join(__dirname, '')));

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

// allowCrossDomain = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   if ('OPTIONS' === req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// };

// app.use(allowCrossDomain);

module.exports = app;
