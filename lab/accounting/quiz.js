        // ランダムを生成する
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var data = {
            q:{},
            qlist:[],
            nextQuiz:null,
            answerTitle:"正解です。",
            isShowAnswer:false,
            isDebug:false,
        };
        var methods = {
            doAdd: function () {
                this.q.items.push({lname:null, lprice: null, rname: null, rprice: null})
            },
            doRemove: function (index) {
                this.q.items.splice(index, 1)
            },
            doAnswer: function (event) {
                this.isShowAnswer = true;
                for (var i in this.q.answers) {
                    if (this.isDebug) {
                    console.log("answers.lname["+ i + "]=" + this.q.answers[i].lname);
                    console.log("answers.lprice["+ i + "]=" + this.q.answers[i].lprice);
                    console.log("answers.rname["+ i + "]=" + this.q.answers[i].rname);
                    console.log("answers.rprice["+ i + "]=" + this.q.answers[i].rprice);
                    console.log("items.lname["+ i + "]=" + this.q.items[i].lname);
                    console.log("items.lprice["+ i + "]=" + this.q.items[i].lprice);
                    console.log("items.rname["+ i + "]=" + this.q.items[i].rname);
                    console.log("items.rprice["+ i + "]=" + this.q.items[i].rprice);
                    }

                    if (this.equals(this.q.answers[i].lname, this.q.items[i].lname)
                    && this.equals(this.q.answers[i].lprice, this.q.items[i].lprice)
                    && this.equals(this.q.answers[i].rname, this.q.items[i].rname)
                    && this.equals(this.q.answers[i].rprice, this.q.items[i].rprice)) {
                        this.answerTitle = "おめでとう、正解です。";
                    } else {
                        this.answerTitle = "残念ながら、不正解です。";
                    }
                }
            },
            equals: function(arg1, arg2) {
                if(arg1 == arg2) {
                    return true;
                } else if (!arg1 && !arg2) {
                    // 両方ともnull、空白の場合はtrue
                    return true;
                }
                return false;
            },
            doNext: function (event) {
                // if (this.nextQuiz) {
                //     window.location.href = 'quiz.html?quiz=' + filename + "&next=" + this.qlist[n+1].file; 
                // }
                var n = getRandomInt(0, this.qlist.length - 1);
                var filename = this.qlist[n].file;
                console.log("filename:" + filename);
                window.location.href = 'quiz.html?quiz=' + filename + "&next=" + this.qlist[n+1].file; 
            },
            doTop: function (event) {
                // トップへ戻る
                window.location.href = 'index.html'; 
            },
            doTest: function (event) {
                console.log("vm.question=" + this.q.question);
                console.log("vm.items[0].lprice=" + this.q.items[0].lprice);
            },
            toCurrency: function(num) {
                // 金額を区切る
                return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
            }
        }
        var computed = {
            question:function() {
                // 改行記号を修正する
                return "<p>" + this.q.question.replace( /\n/g , "</p><p>" ) + "</p>";
            },
            answerDescription:function() {
                // 改行記号を修正する
                return "<p>" + this.q.answerDescription.replace( /\n/g , "</p><p>" ) + "</p>";
            },
            answerCommentary:function() {
                // 改行記号を修正する
                return "<p>" + this.q.answerCommentary.replace( /\n/g , "</p><p>" ) + "</p>";
            }
        }

        var getURLParameter = function() {
            // URLを取得する
            var url = location.href;
            var params = url.split("?");
            var paramArray = [];
            if(params[1]) {
                var spparams = params[1].split("&");
                for ( i = 0; i < spparams.length; i++ ) {
                    vol = spparams[i].split("=");
                    paramArray.push(vol[0]);
                    paramArray[vol[0]] = vol[1];
                }
            }
            console.log("paramArray[quiz]:" + paramArray["quiz"]);
            return paramArray;
        }

        var vm = null;
        $(function(){
            var jsonfilename;
            var nextQuiz;
            // URLパラメータからJSONファイルを探す
            var urlParams = getURLParameter();
            if(urlParams["quiz"]) {
                jsonfilename = urlParams["quiz"];
                data.nextQuiz = urlParams["next"];
            }
            // JSONファイル名を指定する
            var jsonfile = "./json/" + jsonfilename + ".json";
            $.getJSON(jsonfile, function (json) {
                // JSONファイルから読み込んだデータをVueに入れる
                data.q = json;
                // JSONデータを取得したあとにVueを生成する
                vm = new Vue({
                    el: '#accounting',
                    data: data,
                    methods: methods,
                    computed: computed,
                });
            }).fail(function (jqxhr, textStatus, error) {
                // JSONファイルの読み込みに失敗した場合
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            })

            // 問題リストを取得する
            // JSONファイル名を指定する
            var listfile = "./list.json";
            $.getJSON(listfile, function (json) {
                // JSONファイルから読み込んだデータをVueに入れる
                data.qlist = json;
            }).fail(function (jqxhr, textStatus, error) {
                // JSONファイルの読み込みに失敗した場合
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            })
        });