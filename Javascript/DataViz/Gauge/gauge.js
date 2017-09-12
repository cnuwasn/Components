document.circularGauge = function(id, obj) {
    var canvas = document.getElementById(id);
    var width = canvas.width;
    var height = canvas.height;
    var centerFactor = (width > height) ? height/2 : width/2;
    var centerX = centerFactor;
    var centerY = centerFactor;
    var outercircleRadius = 150;
    var outerRingColor = '#4180c7';
    var innerRingColor = '#132c4a';
    var contextEl = canvas.getContext("2d");
    var progressRingBaseColor = '#203d5b';
    var singleAngle = 360 / obj.itemCount;
    var startAngle = 270;
    var tickHeight = 12;
    var tickDistanceFromCentre = 105;
    var tickWidth = 5;
    var tickColor= '#ffad00';
    var outerCapbackgroundColor = '#061626';
    var pointerCapColor = '#ffad00';
    var completed = 5;
    var outerCapRadius = 20;
    var pointerCapRadius = 8;
    var pointerColor = '#fff';
    var progressRingRadius = 80;
    var progressRingWidth = 5;
    var progressPointerColor ='#6dff00';
    drawbackgrounds();
    // var animationTimer = setInterval(function(){
        drawPointer();
    //},1000);
    function drawbackgrounds() {
        //Draw outer Ring
        var circleObj = {
            centerX: centerX,
            centerY: centerY,
            radius: outercircleRadius,
            startAngle: 0,
            endAngle: 2*Math.PI,
            isCounterClockwise: false,
            innerColor: innerRingColor,
            lineWidth: 50,
            lineColor:outerRingColor
        }
        drawCircle(contextEl,circleObj);

        //Draw progress ring
        circleObj.radius = progressRingRadius;
        circleObj.lineWidth = progressRingWidth;
        circleObj.lineColor = progressRingBaseColor;
        drawCircle(contextEl,circleObj);


        //Draw Ticks
        for (i=0; i< obj.itemCount; i++) {
            var ang = degreesToRadians((i * (-singleAngle)) + 90 - startAngle);
            var lineObj = {
                startX:centerX + Math.sin(ang) * (tickDistanceFromCentre),
                startY:centerY + Math.cos(ang) * (tickDistanceFromCentre),
                endX:centerX + Math.sin(ang) * (tickDistanceFromCentre + tickHeight),
                endY:centerY + Math.cos(ang) * (tickDistanceFromCentre + tickHeight),
                lineWidth: tickWidth,
                tickColor: tickColor
            }
            drawLine(lineObj);
        }
        //Draw outer cap ring
        circleObj.radius = outerCapRadius;
        circleObj.innerColor = outerCapbackgroundColor;
        circleObj.lineColor = outerCapbackgroundColor;
        circleObj.lineWidth = 1;
        drawCircle(contextEl,circleObj);

        //Draw pointer cap
        circleObj.radius = pointerCapRadius;
        circleObj.innerColor = pointerCapColor;
        circleObj.lineColor = pointerCapColor;
        drawCircle(contextEl,circleObj);

        //Draw Images
        for (i=0; i< obj.itemCount; i++) {
            var roundFactor = -15;
            var ang = degreesToRadians((i * (-singleAngle)) + 90 - startAngle);
            var imgObj = {
                imageName:'01',//(i < completed)? '21': (i == completed)? '11': '01',
                centerX:roundFactor + centerX + Math.sin(ang) * (outercircleRadius),
                centerY:roundFactor + centerY + Math.cos(ang) * (outercircleRadius),
            }
            loadImage(imgObj);
        }

        //Draw Outer Images
        for (i=0; i< obj.itemCount; i++) {
            var roundFactor = -15;
            var ang = degreesToRadians((i * (-singleAngle)) + 90 - startAngle);
            var imgObj = {
                imageName:(i < completed)? 'tick': (i == completed)? 'load': 'timer',
                centerX:roundFactor + centerX + Math.sin(ang) * (outercircleRadius + 50),
                centerY:roundFactor + centerY + Math.cos(ang) * (outercircleRadius + 50),
            }
            loadImage(imgObj);
        }
    }
    function drawPointer() {
            var circleObj = {
                centerX: centerX,
                centerY: centerY,
                radius: progressRingRadius,
                startAngle: degreesToRadians(startAngle),
                endAngle: degreesToRadians(startAngle + (completed*singleAngle)),
                isCounterClockwise: false,
                innerColor: 'transparent',
                lineWidth: progressRingWidth,
                lineColor:progressPointerColor
            }
            drawCircle(contextEl,circleObj);


            //Draw needle pointer
            var pointerAngle = degreesToRadians((completed * (-singleAngle)) + 90 - startAngle);
            var lineObj = {
                startX:centerX + Math.sin(pointerAngle) * outerCapRadius,
                startY:centerY + Math.cos(pointerAngle) * outerCapRadius,
                endX:centerX + Math.sin(pointerAngle) * (progressRingRadius + (progressRingWidth/2)),
                endY:centerY + Math.cos(pointerAngle) * (progressRingRadius + (progressRingWidth/2)),
                lineWidth: tickWidth,
                tickColor: pointerColor
            }
            drawLine(lineObj);
    }
    //Helper Function
    function drawCircle(ctx, obj) {
        ctx.beginPath();
        ctx.arc(obj.centerX, obj.centerY, obj.radius, obj.startAngle, obj.endAngle , obj.isCounterClockwise);
        ctx.fillStyle = obj.innerColor;
        ctx.fill();
        ctx.lineWidth = obj.lineWidth;
        ctx.strokeStyle = obj.lineColor;
        ctx.stroke();
    }
    function drawLine(obj){
        contextEl.beginPath();
        contextEl.lineWidth = obj.lineWidth;
        contextEl.moveTo(obj.startX,obj.startY);
        contextEl.lineTo(obj.endX,obj.endY);
        contextEl.strokeStyle = obj.tickColor;
        contextEl.stroke();
    }
    function degreesToRadians(degrees) {
        return (Math.PI / 180) * degrees
    }
    function loadImage(obj) {
        var img = new Image();
        img.onload = function() {
            contextEl.drawImage(img, obj.centerX, obj.centerY);
        }
        img.src = 'images/'+ obj.imageName +'.png';
    }
}