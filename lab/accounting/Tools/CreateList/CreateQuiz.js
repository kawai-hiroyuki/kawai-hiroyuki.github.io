/**
 * ディレクトリにあるJSONファイルからリストJSONを作成する
 * 
 * @author Kawai Hiroyuki
 * @since Oct. 16 2016
 */
"use strict";
var fs = require('fs');
var path = require('path');
var StringUtil = require('./StringUtil.js');

exports.createList = function (inDir, outfile) {
/** 読み込みディレクトリ */
inDir = '../../json/';
/** 出力ファイル */
outfile = '../../list.json';
//outfile = './output.json';
var outobj = [];


    // ファイルパスを取得する
    var filePath = path.join(inDir, file);
    //console.log("filePath:" + filePath);
    var basename = path.basename(filePath, path.extname(filePath));
    //console.log("basename:" + basename);
    // ファイルを読み込む
    var readData = fs.readFileSync(filePath, 'utf8');
    var obj = JSON.parse(readData);
    
    // 出力用オブジェクトを作成する 
    outobj.push({
      "text": obj["qNo"],
      "file": basename,
      "tags": obj["tags"],
      "field": obj["field"],
      "lec": obj["lec"],
      "genre": obj["genre"],
      "fieldName": StringUtil.fieldName(obj["field"]),
      "lecName": StringUtil.lecName(obj["lec"]),
      "genreName": StringUtil.genreName(obj["field"], obj["lec"], obj["genre"]),
      "qtype": obj["qtype"],
      "title": obj["title"],
    });

  // JSONファイルを書き出す
  var json = JSON.stringify(outobj, null, "    ");
  fs.writeFile(outfile, json);

  console.log("Finish Create List");
}
