
var oMain = document.getElementsByClassName("main")[0],
    oAudio = document.getElementById("audio"),
    oCurrentTime = document.getElementsByClassName("current-time")[0],
    oAllTime = document.getElementsByClassName("all-time")[0];

var oShoping = document.getElementById("shiping"),
    oPlay = oShoping.getElementsByClassName("iconfont")[0];

var oPorActive = document.getElementsByClassName("pro-active")[0];
    oRadioBox = document.getElementsByClassName("radio-box")[0];
    oProBox = document.getElementsByClassName("pro-box")[0];

var timer,
    duration,
    allWidth = 288;

var oIconUp = document.getElementById("iconup"),
    oIcon1 = oIconUp.getElementsByClassName("iconfont")[0],
    oIconDown = document.getElementById("icondown"),
    oIcon = oIconDown.getElementsByClassName("iconfont")[0];

var osvg = document.getElementsByClassName("music-svg")[0];

/*时长*/
window.onload = function () {
    oCurrentTime.innerHTML = conversion(oAudio.currentTime);
    duration = oAudio.duration;
    oAllTime.innerHTML = conversion(duration);
}
/*时长事件*/
function conversion(time) {
    var sec = parseInt(time % 60) < 10 ? "0" + parseInt(time % 60) : parseInt(time % 60);
    var min = parseInt(time / 60) < 10 ? "0" + parseInt(time / 60) : parseInt(time / 60);
    return min + ":" + sec;
}
/*播放 暂停*/
oShoping.onmouseup = function () {
    if (oAudio.paused) {
        musicPlay();
    }else {
        musicPause();
    }
}
/*播放 暂停事件*/
function musicPlay() {
    oAudio.play();
    oPlay.className = "iconfont icon-zanting";
    timer = setInterval(movePro, 100);
    oMain.style.animationPlayState = "running";
    osvg.style.display = "block";
}
function musicPause() {
    oAudio.pause();
    oPlay.className = "iconfont icon-shiping";
    clearInterval(timer);
    oMain.style.animationPlayState = "paused";
    osvg.style.display = "none";
}
/*进度条*/
function movePro() {
    var currentTime = oAudio.currentTime;
    oCurrentTime.innerHTML = conversion(currentTime);
    oPorActive.style.width = currentTime / duration * allWidth + 12 + "px";
}
/*播放完重播*/
oAudio.onended = function () {
    musicPause();
    oAudio.currentTime = 0;
    oCurrentTime.innerHTML = conversion(0);
    oPorActive.style.width = 12 + "px";
    oIconDown.onclick();
}
/*拖拽进度条*/
oRadioBox.onmousedown = function () {
    clearInterval(timer);
    var c = oAudio.currentTime;

    document.body.onmousemove = function (e) {
        var newWidth = e.clientX - oProBox.getBoundingClientRect().left;
        if (newWidth < 12) {
            newWidth = 12;
        }else if (newWidth > 300) {
            newWidth = 300;
        }
        oPorActive.style.width = newWidth + "px";

        c = (newWidth - 12) / allWidth * duration;
        oCurrentTime.innerHTML = conversion(c);
    }
    document.body.onmouseup = function () {
        document.body.onmousemove = null;
        document.body.onmouseup = null;
        musicPlay();
        oAudio.currentTime = c;
    }
}
/*歌曲*/
var Music = 0;
var MusicName = ["./source/Against The Current.mp3", "./source/Gee.mp3", "./source/Genie.mp3", "./source/Mako - RISE.mp3", "./source/Mr.Taxi.mp3", "./source/OH.mp3", "./source/Stellar - Whiplash.mp3", "./source/Tell me.mp3"];
var MusicLen = MusicName.length;
/*上一首 下一首*/
oIconDown.onclick = function () {
    ChangeShip(1);
}
oIconUp.onclick = function () {
    ChangeShip(-1);
}
/*切换歌曲*/
function ChangeShip(number) {
    musicPause();
    Music += number;

    if (Music > MusicLen - 1) {
        Music = 0;
    }else if (Music < 0) {
        Music = MusicLen - 1;
    }

    oAudio.src = MusicName[Music];
    oAudio.load();
    oAudio.oncanplay = function () {
        duration = oAudio.duration;
        oAllTime.innerHTML = conversion(duration);
    }
    musicPlay();
}

var oVolume = document.getElementsByClassName("volume")[0],
    oLaba = oVolume.getElementsByClassName("iconfont")[0],
    oBox = oVolume.getElementsByClassName("box")[0],
    oBoxBg = oVolume.getElementsByClassName("box-bg")[0];
    oBoxVol = oVolume.getElementsByClassName("box-vol")[0],
    oBoxLaba = oVolume.getElementsByClassName("box-laba")[0];

var obox = false;
oLaba.onclick = function () {
    
    if (obox == false) {
        oBox.style = "display: block";
        obox = true;
    }else {
        oBox.style = "display: none";
        obox = false;
    }
}
/*音量*/
oBoxLaba.onmousedown = function () {
    var v = 1;

    document.body.onmousemove = function (e) {
        var newHeight = e.clientY - oBoxBg.getBoundingClientRect().top;
        if (newHeight > 88) {
            newHeight = 88;
        }else if (newHeight < 0) {
            newHeight = 0;
        }
        oBoxVol.style.height = newHeight + "px";
        oBoxLaba.style.top = newHeight + "px";

        v = parseInt( ( ( -(newHeight / 88) ) + 1 ) * 10 ) / 10;
        oAudio.volume = v;
    }
    document.body.onmouseup = function () {
        document.body.onmousemove = null;
        document.body.onmouseup = null;
        musicPlay();
        
    }
}
