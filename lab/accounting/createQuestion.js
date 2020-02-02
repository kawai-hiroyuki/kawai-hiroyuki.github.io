/**
 * 問題作成
 * 2016.10.11 初回作成
 */

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

// 初期値
var data = {
    version:"1.0.0",
    qNo: "",
    qtype: "zentb",
    title:null,
    tags: [],
    question: "",
    items: null,
    answers: null,
    memo: null,
    answerDescription: "",
    answerCommentary: "",
    createdate:null,
    field:null,
    lec:null,
    genre:null,
    fields:[
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ],
    resultJson: "",
    isJournaling:false,
};

// 関数
var methods = {
    // JSONを生成し、変換結果欄に配置する
    doConvertJSON: function () {
        console.log("qtype:" + vm.qtype);
        console.log("this.title:" + data.title);
        var output = {
            "version":vm.version,
            "qNo": vm.qNo,
            "qtype": vm.qtype,
            "title":vm.title,
            "field": vm.field,
            "lec": vm.lec,
            "genre": vm.genre,
            "tags": [],
            "question": vm.question,
            "items": null,
            "answers": null,
            "memo": vm.memo,
            "answerDescription": vm.answerDescription,
            "answerCommentary": vm.answerCommentary,
            "createdate": nowtime(),
        }
        //vm.resultJson = JSON.stringify(output);
        vm.resultJson = JSON.stringify(output, null, "    ");

        // リスト作成サーバーと通信する 
        $.ajax({
            url: "http:localhost:3000",    // URL
            type: "GET",    // GETかPOST（非設定時はGET）
            cache: true,    // 通信結果をキャッシュするか（非設定時はtrue）
            timeout: 1000,    // タイムアウトのミリ秒
            username: "",    // 認証が必要な場合のユーザー名
            password: "",    // 認証が必要な場合のパスワード
            success: function (res, dataType) {
                // 成功時に実行する関数
                console.log("success");
            },
            error: function (XMLHttpRequest, textStatus, error) {
                // 失敗時に実行する関数
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            }
        });


    },
    // 分野リストが変更されたとき
    doChangeQType: function () {
        console.log("qtype:" + vm.qtype);
        switch (vm.qtype) {
            case "writing":
                // 論述式
                break;
            case "siwake":
                // 仕訳
                isJournaling = true;
                break;
            case "zentb":
                // 決算前残高試算表
                isJournaling = true;
                break;
        }
    },
    // 分野リストが変更されたとき
    doChangeField: function() {
        vm.qNo = vm.getQNo;
    },
    // レクチャーリストが変更されたとき
    doChangeLec: function() {
        vm.qNo = vm.getQNo;
    },
    // ジャンルリストが変更されたとき
    doChangeGenre: function() {
        vm.qNo = vm.getQNo;
    },
}
var computed = {
    // qNoを取得する
    getQNo: function () {
        return vm.field + vm.lec + "_" + vm.genre + "_";
    },
}
var vm = null;
$(function () {
    vm = new Vue({
        el: '#accounting',
        data: data,
        methods: methods,
        computed: computed,
    });
});