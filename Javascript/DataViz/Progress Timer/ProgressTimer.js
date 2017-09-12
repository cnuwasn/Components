
document.progressTimer = function drawCanvas(id, obj) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    var cWidth = canvas.width;
    var cHeight = canvas.height;
    var countTo = obj.reverseCount ? obj.count : 0;
    var counter = obj.reverseCount ? 0 : obj.count;
    var angle = obj.rotateDirection === 'counterClockwise' ? obj.startAngle + 360 : obj.startAngle;
    var inc = 360 / obj.count;
    var lastDraw = false;
    var hour, min, sec;
    var stopTimer;
    if(obj.delimiter === undefined)
        obj.delimiter = ':';
    if (obj.showCount === undefined)
        obj.showCount = true;
    if (!obj.completedAnimationColor)
        obj.completedAnimationColor = obj.animationColor;
    if (!obj.completeFontColor)
        obj.completeFontColor = obj.fontColor;

    function formatTime(countTo) {
        if (obj.countFormat !== 'plainNumber') {
            var date = new Date(countTo * 1000).toISOString();
            var formatedDate = (obj.countFormat === 'HH:MM:SS') ? date.substr(11, 8) : date.substr(14, 5);
            return formatedDate;
        } else {
            return countTo;
        }
    }

    function drawScreen() {
        //======= reset canvas
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, cWidth, cHeight);

        //========== base arc
        var radius = (obj.radius) ? obj.radius : (cWidth > cHeight) ? (cHeight / 2 - 10) : (cWidth / 2 - 10);
        ctx.beginPath();
        ctx.strokeStyle = obj.baseColor;
        ctx.lineWidth = obj.baseWidth;
        ctx.arc(cWidth / 2, cHeight / 2, radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
        ctx.stroke();
        ctx.closePath();

        //========== dynamic arc

        ctx.beginPath();
        ctx.strokeStyle = obj.animationColor;
        ctx.lineWidth = obj.ringWidth;
        ctx.arc(cWidth / 2, cHeight / 2, radius, (Math.PI / 180) * obj.startAngle, (Math.PI / 180) * angle, false);
        ctx.stroke();
        ctx.closePath();

        //====== Labels

        var textColor = obj.fontColor;
        var textSize = obj.fontSize;
        var fontFace = "helvetica, arial, sans-serif";

        ctx.fillStyle = textColor;
        ctx.font = textSize + "px " + fontFace;

        //====== Values
        ctx.fillStyle = obj.fontColor;
        ctx.font = obj.fontSize + ' ' + fontFace;
        if (obj.showCount) {
            var timeString = formatTime(countTo).toString();
            (timeString.indexOf(':') > -1) && timeString.replace(/:/g, obj.delimiter);
            var timeStringWidth = ctx.measureText(timeString).width;
            ctx.fillText(timeString, cWidth / 2 - (timeStringWidth * 0.5), cHeight / 2 + 5);
        }
        countTo = obj.reverseCount ? countTo - 1 : countTo + 1;
        if (lastDraw) {
            clearInterval(stopTimer);
        }
        if (counter === countTo) {
            obj.animationColor = obj.completedAnimationColor;
            obj.fontColor = obj.completeFontColor;
            lastDraw = true;
        }

        if (obj.rotateDirection === 'counterClockwise')
            angle -= inc;
        else
            angle += inc;
    }

    stopTimer = setInterval(drawScreen, 1000);

};