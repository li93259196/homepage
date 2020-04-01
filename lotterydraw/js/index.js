var rotateNum = 5;//默认转几圈
var flag = false;//是否在抽奖中
var _deg = 0;
$('.btn').click(function () {
    if (!flag) {
        startCbs();
    } else {
        // 禁止抽奖
        disabledCbs();
    }
});

// 开始抽奖
function startCbs() {
    goLottery(randomDeg());
}
// 禁止抽奖
function disabledCbs() {
    console.log('抽奖中……');
}
// 结束抽奖
function endCbs(deg) {
    var str = '';
    if (deg < 60) {
        str = '10M 流量';
    } else if (deg >= 60 && deg < 120) {
        str = '20元 话费'
    } else if (deg >= 120 && deg < 180) {
        str = 'iPad mini 4'
    } else if (deg >= 180 && deg < 240) {
        str = '5元 话费'
    } else if (deg >= 240 && deg < 300) {
        str = '30M 流量'
    } else {
        str = 'iPhone7';
    }
    alert("恭喜获得：" + str);
}

// 随机生成角度
function randomDeg() {
    // [0,1) * 360
    var angle;
    var num = Math.random() * 10;
    if (num < 8) {
        // 10M [0, 60)
        angle = Math.floor(Math.random() * 60);
    } else if (num >= 8 && num < 9) {
        // 30M [240, 300)
        angle = Math.floor(Math.random() * 60 + 240);
    } else if (num >= 9 && num < 9.6) {
        // 5元 [180, 240)
        angle = Math.floor(Math.random() * 60 + 180);
    } else if (num >= 9.6 && num < 9.8) {
        // 20元 [60, 120)
        angle = Math.floor(Math.random() * 60 + 60);
    } else if (num >= 9.8 && num < 9.9) {
        // mini4 [120, 180)
        angle = Math.floor(Math.random() * 60 + 120);
    } else if (num >= 9.9) {
        // iphone [300, 360)
        angle = Math.floor(Math.random() * 60 + 300);
    }
    return angle;
}


// 控制转盘旋转
function goLottery(deg) {
    flag = true;
    _deg = deg;
    var angle = deg + rotateNum * 360;
    $('.table').css({
        'transform': 'rotate(' + angle + 'deg)',
        'transition': 'transform 5s ease'
    });
}

// 监听动画结束
$('.table').on('webkitTransitionEnd', function () {
    flag = false;
    $('.table').css({
        'transition': 'none',
        'transform': 'rotate(' + _deg + 'deg)'
    });
    endCbs(_deg);
})

