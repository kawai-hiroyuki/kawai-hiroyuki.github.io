/**
 * 問題リストを作成する
 * @since 2016.10.22
 */

var data = {
    list: null,
};

// 関数
var methods = {
    // マッチ検索（HTML側の変数でフィルタ）
    fieldFilter: function (filter) {
        return this.list.filter(function (item) {
            regexp = new RegExp(filter);
            console.log("item.field: " + item.field);
            return regexp.test(item.field);
        })
    }
}

var computed = {
    /**
     * 問題のリンクを取得する
     * @param filename 問題のファイル名(拡張子は除く)
     */
    // quizLink: function (filename) {
    //     return "quiz.html?quiz=" + filename;
    // },
}

// 問題リンクのテンプレートを作成する
var QuizLink = Vue.extend({
    template: '<a href=\"quiz.html?quiz={{ quiz.file }}\"> \
             <p><small>{{ quiz.fieldName }}{{ quiz.lec }} {{ quiz.genreName }}</small> \
             <strong>{{ quiz.title }}<strong></p></a>',
    props: ['quiz'],
})

// 登録する
Vue.component('my-quizlink', QuizLink);

var vm = null;
$(function () {
    // リストファイル(JSON)を指定する
    var jsonfile = "./list.json";
    $.getJSON(jsonfile, function (json) {
        // JSONファイルから読み込んだデータをVueに入れる
        data.list = json;
    }).fail(function (jqxhr, textStatus, error) {
        // JSONファイルの読み込みに失敗した場合
        var err = textStatus + ", " + error;
        console.log("Request Failed: " + err);
    })

    vm = new Vue({
        el: '#accounting',
        data: data,
        methods: methods,
        computed: computed,
    });
});