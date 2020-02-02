
$(function () {
    $('#timeBtn').click(function (e) {
        var kyori = $('#kyori').val();
        var hayasa = $('#hayasa').val();
        $('#hour').val(calHour(kyori, hayasa));
        $('#min').val(calMinutes(kyori, hayasa));
    });

    $('#distanceBtn').click(function (e) {
        var hour = $('#distanceSection #hour').val();
        var min = $('#distanceSection #min').val();
        var hayasa = $('#distanceSection #hayasa').val();
        $('#distanceSection #kyori').val(calDistance(hayasa, hour, min));
    });

    $('#velocityBtn').click(function (e) {
        var hour = $('#velocitySection #hour').val();
        var min = $('#velocitySection #min').val();
        var kyori = $('#velocitySection #kyori').val();
        $('#velocitySection #hayasa').val(calVelocity(kyori, hour, min));
    });

    // クリアボタン β版　ボタンの親で切り替えれるようにする
    $('#clearTimeBtn').click(function (e) {
        $('input[type="number"]').val(0);
    });
    $('#clearDistanceBtn').click(function (e) {
        $('input[type="number"]').val(0);
    });
    $('#clearVelocityBtn').click(function (e) {
        $('input[type="number"]').val(0);
    });

});

// 時間を求める
// 時間(time) = 距離(distance) / 速度(velocity)
// 時間(hour)を求める
function calHour(distance, velocity) {
    if (distance == 0 || velocity == 0) {
        // 引数が0の場合
        return 0;
    }
    // 文字→浮動小数点
    var d = parseFloat(distance);
    var v = parseFloat(velocity);
    // Math.floor:小数点以下を切り捨てる
    return Math.floor(d / v);
}
// 分(minutes)を求める
function calMinutes(distance, velocity) {
    if (distance == 0 || velocity == 0) {
        // 引数が0の場合
        return 0;
    }
    // 文字→浮動小数点
    var d = parseFloat(distance);
    var v = parseFloat(velocity);
    // 小数点以下を求めて60をかけて分を求める
    return Math.round((d / v - Math.floor(d / v)) * 60);
}

// 距離(distance) = 速度(velocity) * 時間(time)
function calDistance(velocity, hour, min) {
    if (velocity == 0 || hour + min == 0) {
        // 引数が0の場合
        return 0;
    }
    var v = parseFloat(velocity);
    var t = parseFloat(hour) + parseFloat(min) / 60;
    return v * t;
}

// 速度(velocity) = 距離(distance) / 時間(time)
function calVelocity(distance, hour, min) {
    if (distance == 0 || hour + min == 0) {
        // 引数が0の場合
        return 0;
    }
    var d = parseFloat(distance);
    var t = parseFloat(hour) + parseFloat(min) / 60;
    return d / t;
}

