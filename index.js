const socket = require('socket.io-client')('http://localhost:3000');
let uuid = require('uuid/v4');
let sessionId = uuid();

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
  console.log('Visit ', `http://localhost:3000/view/${ sessionId }`);
  startCapture();
});

socket.on('PROCESS_IN', function(data){
  console.log('Incoming command');
});

socket.on('disconnect', function(){
  console.log('disconnnected');
});
