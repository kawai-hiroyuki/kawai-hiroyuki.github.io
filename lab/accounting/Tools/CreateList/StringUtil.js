/**
 * 種類
 */
exports.qTypeName = function (qType) {
    var qTypeArray = {
        "writing": "論述式",
        "siwake": "仕訳",
        "zentb": "決算前残高試算表",
    }
    return qTypeArray[qType];
}
// console.log("qTypeName:" + qTypeName("writing"));
// console.log("qTypeName:" + qTypeName("w"));

/**
 * 分野
 */
exports.fieldName = function (field) {
    var fieldArray = {
        "f": "財務会計",
        "m": "管理会計",
        "c": "会社法",
        "a": "監査論",
    }
    return fieldArray[field];
}
// console.log("fieldName:" + fieldName("f"));
// console.log("fieldName:" + fieldName("q"));

/**
 * レクチャー
 */
exports.lecName = function (lec) {
    var lecArray = {
        "1": "レクチャー1",
        "2": "レクチャー2",
        "3": "レクチャー3",
        "4": "レクチャー4",
        "5": "レクチャー5",
    }
    return lecArray[lec];
}
// console.log("lecName:" + lecName("1"));
// console.log("lecName:" + lecName("q"));

/**
 * ジャンル
 */
exports.genreName = function (field, lec, genre) {

    var f = [{
        // 財務会計1
        "01": "第1章 財務諸表",
        "02": "第2章 商品売買",
        "03": "第3章 棚卸資産の期末評価",
        "04": "第4章 現金及び預金",
        "05": "第5章 割引現在価値",
        "06": "第6章 債券・債務等",
        "07": "第7章 貸倒れと貸倒引当金",
        "08": "第8章 有価証券",
        "09": "第9章 デリバティブ取引・ヘッジ会計等",
        "10": "第10章 有形固定資産",
        "11": "第11章 リース取引",
        "12": "第12章 無形固定資産",
        "13": "第13章 研究開発費とソフトウェア",
        "14": "第14章 投資その他の資産",
        "15": "第15章 固定資産の減損",
        "16": "第16章 繰延資産",
    }, {
        // 財務会計2
        "01": "第1章 社債",
        "02": "第2章 引当金",
        "03": "第3章 退職給付",
        "04": "第4章 資産除去債務",
        "05": "第5章 純資産",
        "06": "第6章 新株予約権と新株予約権付社債",
        "07": "第7章 ストック・オプション",
        "08": "第8章 税金",
        "09": "第9章 税効果会計",
        "10": "第10章 外貨建取引",
    }];

    // 管理会計
    var m = [{
        // 管理会計1
        "01": "第1章 管理会計論総論",
        "02": "第2章 費目別計算",
        "03": "第3章 部門別計算",
        "04": "第4章 個別原価計算",
        "05": "第5章 総合原価計算",
        "06": "第6章 標準原価計算",
        "07": "補章 営業費計算",
    }];
    
    // 会社法
    var c = [{}];
    // 監査論
    var a = [{}];

    switch (field) {
        case "f":
            // 財務会計
            return f[lec -1][genre];
        case "m":
            // 管理会計
            return m[lec -1][genre];
        case "c":
            // 会社法
            return c[lec -1][genre];
        case "a":
            // 監査論
            return a[lec -1][genre];
    }
}

// console.log("genreName:" + genreName("f", "2", "01"));
// console.log("genreName:" + genreName("m", "1", "03"));