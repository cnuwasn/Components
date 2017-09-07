
document.progressTimer = function drawCanvas(id, obj) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    var cWidth = canvas.width;
    var cHeight = canvas.height;

    var countTo = obj.count;
    if(obj.countFormat !== 'plainNumber') {
        var hour = Math.floor(countTo / 3600)
        var min = Math.floor(hour / 60);
        var sec = countTo - (min * 60);
    }
    var counter = 0;
    var angle = 270;
    var inc = 360 / countTo;


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
        ctx.arc(cWidth / 2, cHeight / 2, radius, (Math.PI / 180) * 270, (Math.PI / 180) * angle, false);
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

        hour = ("0" + hour).slice(-2);
        mins = ("0" + min).slice(-2);
        secs = ("0" + sec).slice(-2);

        var timeString = hour+':'+mins+':'+secs;
        var timeStringWidth = ctx.measureText(timeString).width;

        ctx.fillText(timeString, cWidth / 2 - (timeStringWidth * 0.5), cHeight / 2 + 5);


        if (sec <= 0 && counter < countTo) {
            angle += inc;
            counter++;
            min--;
            sec = 59;
        } else
            if (counter >= countTo) {
                sec = 0;
                min = 0;
            } else {
                angle += inc;
                counter++;
                sec--;
                if (counter === countTo && sec === 0) {
                    obj.animationColor = obj.completedAnimationColor;
                    obj.fontColor = obj.completeFontColor;
                }
            }
    }

    setInterval(drawScreen, 1000);

};