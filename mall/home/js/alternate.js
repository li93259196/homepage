//定义
var index = 0,
    num = 5,
    itemWidth = 1226,
    timer = undefined;
//自动轮播
timerFun();
//轮播函数
function move(dirction) {
    //清除计时器
    clearTimeout(timer);
    //快速点击时，立即完成当前动画
    $('.banner-ui').stop(false, true);
    //判断
    if(dirction == 'next') {
        index++;
        //右无缝轮播
        if(index > num) {
            $('.banner-ui').css({
                left: 0
            });
            index = 1;
        }
    }else if(dirction == 'prev') {
        index--;
        //左无缝轮播
        if(index < 0) {
            $('.banner-ui').css({
                left: num * -itemWidth
            });
            index = 4;
        }
    }
    //动画
    $('.banner-ui').animate({
        left: index * -itemWidth
    }, function () {
        timerFun();//轮播
    });
    //按钮与动画同时轮播
    active( $('.item').eq(index == 5 ? 0 : index) );
}
//自动轮播计时器事件
function timerFun() {
    timer = setInterval(function () {
        move('next');
    }, 3000);
}
//修改按钮颜色事件
function active(dom) {
    $('.active').removeClass('active');
    dom.addClass('active');
}
//左轮播点击事件
$('.rl-prev').click(function () {
    move('prev');
});
//右轮播点击事件
$('.rl-next').click(function () {
    move('next');
});
//按钮点击事件
$('.item').click(function () {
    index = $(this).index();
    move('');
});