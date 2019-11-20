# BlackPipe
BlackPipe is a simple tool to expose terminal outputs without sacrificing security.

## Features
 * Unique URL for each session
 * Realtime
 * Log filters
 * Lite
 * Easy-to-use
 * Self hosted server support

## Installation
It is better to install blackpipe globally, so that you can use it from anywhere.  
```bash
npm install blackpipe -g
```

## Usage
Piping outputs to blackpipe is easy. You can use the same bash syntax that you are familiar with.

That's easy as this.
```bash
ping localhost | blackpipe
connecting...
open  https://blackpipe.glitch.me/view/6dd41672-1637-4de8-9c85-51bcf4f183e5
```

Theres no limitation on what command's output you are piping to blackpipe. BlackPipe works with pretty much any command that has an output.

BlackPipe uses sockets to stream data to the web page. By default, it uses a server hosted at `https://blackpipe.glitch.me/`. 

BlackPipe allows you to pre define the session name using `--session` params.
```bash
nc -zv 192.168.10.121 1-1023 | blackpipe --session "mysession"
```

If you want to output things to the stdout same time, use `-o` switch.
```bash
tree | blackpipe -o 
```

You can setup a blackpipe server your own if you want to. The source for blackpipe-server is available at [https://github.com/shajanjp/blackpipe-server](github).
To use your own server, use `--host` params to override default server.
```bash
tracepath google.com | blackfire --host "https://mydomain.com/blackpipe-server"
```

## Common use cases
 * `pm2 logs | blackpipe`
 * `tail -f /var/log/nginx/domain.access.log | blackpipe`
 * `npm build | blackpipe`
