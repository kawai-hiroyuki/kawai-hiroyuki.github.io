/**
 * サーバーの通信からリストJSONを作成する
 * 
 * @author Kawai Hiroyuki
 * @since Oct. 24 2016
 */
"use strict";
var http = require('http');
// リスト作成用
var CreateList = require('./CreateList.js');

http.createServer(function(req,res){
  // TODO 通信元の情報をもとに処理を変化させたい

  // リストを作成する
　CreateList.createList();
  // TODO 処理結果を戻せるようにしたい
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hellow World!!');
}).listen(3000);

console.log('CreateList Server run');
console.log('Server address: http://localhost:3000/');
console.log('Server running... press ctrl-c to stop.');