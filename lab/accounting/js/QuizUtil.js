/**
 * ランダムを生成する
 * @param int 
 */
var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * URLを取得する
 * @returns array パラメータの配列
 */
var getURLParameter = function () {
    var url = location.href;
    var params = url.split("?");
    var paramArray = [];
    if (params[1]) {
        var spparams = params[1].split("&");
        for (i = 0; i < spparams.length; i++) {
            vol = spparams[i].split("=");
            paramArray.push(vol[0]);
            paramArray[vol[0]] = vol[1];
        }
    }
    return paramArray;
}

// 現在時間を取得する
var nowtime = function() { 
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var d = now.getDate();
  var h = now.getHours();
  var mi = now.getMinutes();
  var mm = ("0" + m).slice(-2);
  var dd = ("0" + d).slice(-2);
  var hh = ("0" + h).slice(-2);
  var mmi = ("0" + mi).slice(-2);
  return y + "/" + mm + "/" + dd + " " + hh + ":" + mmi;
}

// タブで成形されたJSONコードを返す
var formatedJSON = function(obj) {
    return JSON.stringify(obj, null, "    "); 
}
