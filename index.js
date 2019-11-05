#!/usr/bin/env node
const argv = require('yargs').argv
const HOST = 'https://blackpipe.glitch.me';
const socket = require('socket.io-client')(HOST);
let uuid = require('uuid/v4');
let sessionId = uuid();
 
if (argv.session) {
  sessionId = argv.session;
}

function startCapture(){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function(chunk) {
    socket.emit('PROCESS_OUT', { chunk, sessionId })
  });

  process.stdin.on('end', function() {
    console.log('done');
    process.exit();
  });
}

socket.on('connect', function(){
  console.log('connected');
  console.log('View : ', `${ HOST }/view/${ sessionId }`);
  startCapture();
});

socket.on('PROCESS_IN', function(data){
  console.log('Incoming command');
});

socket.on('disconnect', function(){
  console.log('disconnnected');
});
