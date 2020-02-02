/*========================================
 * Quiz Generator v 2.1 設定ファイル
 * Copyright 2012 Sawa's Factory
 * http://sawa-s.com/quiz-generator.html
========================================*/

/* ===================	オープニング&クイズ設定	=================== */
/* クイズボックスの横幅 縦幅*/
var q_w = 450;		//横幅 px  min=400
var q_h = 380;		//縦幅 px  選択数の増減によって調整してください。3択：330  4択：380   5択：430
/* タイトル */
var q_title = "中国語　４択クイズ";
/* 出題数 */
var questionAmount = 10;
/* 出題順 0-昇順 1-ランダム */
var questionOrder = 0;
/* 正解・不正解の表示 0-しない 1-する */
var isShowCorrectMark = 1;
/* 正解・不正解を表示する場合、表示する秒数 */
var q_dtime = 2;
/* 正解・不正解を表示する場合、サウンドを使用  0-しない 1-する */
var q_sound = 1;
/* 制限時間（秒） 0-設定なし  */
var q_timer = 10;
/* 選択岐をシャッフル 0-しない 1-する */
var isShuffle = 1;
// 画面の著作権表示
var creditUrl = "http://kawai-hiroyuki.github.io/";
var creditTitle = "HIROYUKI7";

/* ==== エンディング ==== */
var endings = [
	 [100, [
		"<span class='msg_tokuten'> う～ん、お見事!!</span>"
		,"<span class='msg_tokuten'> あなたの得点は <strong>満点</strong>でした。</span>"
		,"",
		,"正解数は!seikai_num!問、正解率は!percent!％です。"
	]]
	,[80, [
		"<span class='msg_tokuten'>う～ん。さすがですね。</span>"
		,"<span class='msg_tokuten'>あなたの得点は <strong>!tokuten!点</strong> でした。</span>"
		,""
		,"正解数は!seikai_num!問、正解率は!percent!％です。"
		,"再挑戦をお待ちしています。"
	]]
	,[50, [
		"<span class='msg_tokuten'>なかなかやりますね。</span>"
		,"<span class='msg_tokuten'>あなたの得点は <strong>!tokuten!点</strong> でした。</span>"
		,""
		,"正解数は!seikai_num!問、正解率は!percent!％です。"
		,"再挑戦をお待ちしています。"
	]]
	,[30, [
		"<span class='msg_tokuten'>もうちょっとです。がんばりましょう</span>"
		,"<span class='msg_tokuten'>あなたの得点は <strong>!tokuten!点</strong> でした。</span>"
		,""
		,"正解数は!seikai_num!問、正解率は!percent!％です。"
		,"再挑戦をお待ちしています。"
	]]
	,[0, [
		"<span class='msg_tokuten'>あれ、わざと間違えたのかな。</span>"
		,"<span class='msg_tokuten'>あなたの得点は <strong>!tokuten!点</strong> でした。</span>"
		,""
		,"正解数は!seikai_num!問、正解率は!percent!％です。"
		,"再挑戦をお待ちしています。"
	]]
];
/* リスタートボタン名 空白("")にするとボタンを非表示にする事ができます。 */
var restart_button = "再挑戦する";
