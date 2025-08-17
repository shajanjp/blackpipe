#!/usr/bin/env node
const argv = require('yargs').argv
const HOST = 'http://localhost:3000';
const socket = require('socket.io-client')(HOST);
const { v4: uuid } = require('uuid');
let sessionId = uuid();
 
if (argv.session) {
  sessionId = argv.session;
}

function startCapture(){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function(chunk) {
    if(argv.o){
      process.stdout.write(chunk);
    }

    socket.emit('PROCESS_OUT', { chunk, sessionId })
  });

  process.stdin.on('end', function() {
    console.log('done');
    process.exit();
  });
}

console.log('connecting...');

socket.on('connect', function(){
  console.log('open ', `${ HOST }/view/${ sessionId }`);
  startCapture();
});

socket.on('PROCESS_IN', function(data){
  console.log('Incoming command');
});

socket.on('disconnect', function(){
  console.log('disconnnected');
});
