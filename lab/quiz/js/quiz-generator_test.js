/*
 * Chinese Quiz v 1.0
 * Kawai Hiroyuki
 * http://kawai-hiroyuki.github.io
 */
// [問題文,解答文,正解番号,得点,解説]
var COLUMN_QUESTION = 0;    // 問題文
var COLUMN_ANSWER = 1;      // 解答文
var COLUMN_CORRECT = 2;     // 正解番号
var COLUMN_POINT = 3;       // 得点
var COLUMN_ANSWER_DESP = 4; // 解説
// 一問につき解答個数
var ANSWER_NUMBER = 4;

// 現在の問題数
var q_now = 0;
// 得点
var tokuten = 0;
var q_tok = 0;
// 最大得点
var tsum = 0;
var percent = 0;
// 正解数
var correctAmount = 0;

var ques = new Array();
var seq = new Array();
function initViewLoaded() {
  for (i = 0; i < questionAmount; i++) {
    ques[i] = 0;
  }
  // 問題総数が出題数よりも少ない場合
  if (questions.length < questionAmount) {
    // 問題不足エラー
    alert("エラー：出題数" + questionAmount +
      "問ですが、問題数が" + questionLength +
      "問しかありません。\n問題数を増やすか、出題数を減らしてください。");
    throw new Error(0, "");
  }

  // 問題番号を設定
  for (i = 0; i < questions.length; i++) {
    seq[i] = i;
  }
  if (questionOrder == 1) {
    // 出題順が1（ランダム）だった場合
    shuffle(seq);
  }
}

// 画面が読み込まれて、初めに実行される
$(function() {
  initViewLoaded();
	// topViewを読み込む
  $("#quiz_box").load("./subview/topView.html").width(q_w).height(q_h);
})

// トップビューが読み込まれたときに実行される
function topViewLoaded() {
  // 正解・不正解の表示
  if (isShowCorrectMark) {
		$("#imageView").show();
  } else {
		$("#imageView").hide();
  }
  // 正解・不正解の表示とサウンドを鳴らす場合
  if (isShowCorrectMark && q_sound) {
		$("#soundView").show();
  } else {
		$("#soundView").hide();
  }
  // タイマーを使用する場合
  if (q_timer) {
		$("#timerView").show();
  } else {
		$("#timerView").hide();
  }
  // タイトルを設定する
  $("#quiz_title").text(q_title);
  // 著作権表示
  $("#credit").attr("href", creditUrl);
  $("#credit").text(creditTitle);

  $("#quiz_wrap").height(q_h - 90);
  //スタートボタンイベントを設定する
  $("#quiz_start").click(function() {
    $("#quiz_msg").hide();
    go_question();
  });
}

// 出題する
function go_question() {
  // quizViewをロードする
  $("#quiz_wrap").load("./subview/quizView.html");
}

// クイズビューが読み込まれたとき
function quizViewLoaded() {
  var a_seq = [];
  for (i = 0; i < ANSWER_NUMBER; i++) {
    a_seq[i] = i;
  }
  // シャッフルする場合
  if (isShuffle) {
    shuffle(a_seq);
  }
  // 問題を表示
  var currentQuizNum = q_now + 1;
  var q = new question(questions[seq[q_now]]);
  $("#quiz_question").text(currentQuizNum + " " + q.question);
  for (i = 0; i < a_seq.length; i++) {
    j = a_seq[i] + 1;
    var k = i + 1;
    if(i===0) {
      $("#quiz_answer").append("<div id='qan" + j + "' class='qan_list' onclick='q_answer(" + j + ");'>第"　+ k + "問 " + q.mean + "</div>");
    } else {
      var r = new question(questions[getRandomNumber()]);
      $("#quiz_answer").append("<div id='qan" + j + "' class='qan_list' onclick='q_answer(" + j + ");'>第"　+ k + "問 " + r.mean + "</div>");
    }
  }
  $("#quiz_wrap").slideDown("slow");
  if (q_timer) {
    tm_count = q_timer;
    qt_interval = setInterval(quiz_timer, 1000);
  }
}

function q_answer(ans) {
  if (ques[q_now] == 0) {
    if (q_timer) {
      clearInterval(qt_interval);
    }
    ques[q_now] = 1;
    for (i = 0; i < questions[seq[q_now]][COLUMN_ANSWER].length; i++) {
      j = i + 1;
      if (ans == j) {
        $("#qan" + j).css("background", "#FFE").css("border", "2px inset #eee").css("cursor", "wait");
      } else {
        $("#qan" + j).css("background", "#cfc").css("border", "2px outset #6c6").css("cursor", "wait");
      }
    }
    // 押したボタンと正解番号が同じ場合
    if (questions[seq[q_now]][COLUMN_CORRECT] == ans) {
      tokuten = tokuten + questions[seq[q_now]][COLUMN_POINT];
      qa = 1;
      correctAmount++;
    } else {
      qa = 0;
    }
    if (isShowCorrectMark) {
      if (q_sound) {
        //$("#quiz_question").append("<embed src='" + sound_file[qa] + "' autostart='true' hidden='true' loop='false' />");
      }
      $("#dsp" + qa).fadeIn();
      nl = setTimeout(q_answer_close, q_dtime * 1000);
    } else {
      nl = setTimeout(q_answer_close, 500);
    }
  }
}

// 次の問題
function next_question() {
  q_now++;
  if (q_now >= questionAmount)　 {
    //設定時間を超えた場合は終了処理に移動する
    n = setTimeout(ending, 　1000);
  }　
  else {
    go_question();
  }
}

function q_answer_close() {
  tsum = tsum + questions[seq[q_now]][COLUMN_POINT];
  $("#dsp0,#dsp1").hide();
  $("#quiz_wrap").slideUp("slow");
  if (q_timer) {
    $("#quiz_timer").html("");
  }
  n = setTimeout(next_question, 1000);
}

// 画面表示のタイマー
function quiz_timer() {
  tm_count--;
  if (tm_count <= 0) {
    // 時間切れの処理
    $("#quiz_timer").html("時間切れ！！");
    q_answer(0);
  } else {
    $("#quiz_timer").html("残り：" + tm_count + "秒");
  }
}

// 終了処理
function ending() {
  // 得点処理
  if (tokuten < 1) {
    var q_tok = 0;
  } else {
    var q_tok = Math.round(tokuten / tsum * 100);
  }

  percent = Math.round(correctAmount / questionAmount * 100);

  for (i = 0; i < endings.length; i++) {
    if (q_tok >= endings[i][0]) {
      var ending_msg = endings[i][1];
      break;
    }
  }

  var ending_msg_html = ending_msg.join("&nbsp;<br />");
  ending_msg_html = ending_msg_html.replace(/!tokuten!/g, q_tok);
  ending_msg_html = ending_msg_html.replace(/!correctAmount!/g, correctAmount);
  ending_msg_html = ending_msg_html.replace(/!percent!/g, percent);
  var restart_button_div = "<div id='quiz_start' onclick='location.reload();'>" + restart_button + "</div>"
  if (restart_button == "") {
    restart_button_div = "";
  }

  $("#quiz_msg").html(ending_msg_html + restart_button_div).slideDown("slow");
}

// 出題順をシャッフルする
function shuffle(list) {
  var i = list.length;
  while (--i) {
    var j = Math.floor(Math.random() * (i + 1));
    if (i == j) continue;
    var k = list[i];
    list[i] = list[j];
    list[j] = k;
  }
  return list;
}

// [問題文(単語）,解答(意味),ピンイン,解説,得点]
function question(value) {
  this.question=value[0];   //名前
  this.mean=value[1];   // 解答(意味)
  this.pinyin=value[2];   //ピンイン
  this.desc=value[3];   //解説
  this.point=value[4];    //得点
}

// 配列からランダムに取り出す
function getRandomNumber() {
  // 乱数を発生させる
  return 1 + Math.floor(Math.random() * questions.length);
}