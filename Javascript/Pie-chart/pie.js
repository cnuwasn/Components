document.pie = function (id, obj) {
    var pie = document.getElementById(id);
    var centerX = pie.width / 2;
    var centerY = pie.height / 2;
	var inputradius = obj.radius;
    var outercircleRadius = (((centerX > centerY) ? centerY : centerX) > inputradius) ? inputradius : ((centerX > centerY) ? centerY : centerX);
    var contextEl = pie.getContext("2d");
	var tickColor, sliceAngle;
	var startAngle = obj.startAngle;
	var endAngle = degreesToRadians(startAngle);
	var animationRadiusVariation = outercircleRadius / 20;
	var startAnimation, drawRadius = 0;
	var circleObj = {
		startAngle: startAngle,
		endAngle: endAngle
	};
	if (obj.enableAnimation) {
		drawRadius = animationRadiusVariation;
		startAnimation = setInterval(drawPieChart, 50);
	}
	else {
		drawRadius = outercircleRadius;
		drawPieChart();
	}
	function drawPieChart() {
		if (obj.enableAnimation && drawRadius >= outercircleRadius) {
			drawRadius = outercircleRadius;
			clearInterval(startAnimation);
		}
		contextEl.clearRect(0, 0, pie.width, pie.height);
		for (var i = 0; i < obj.ranges.length; i++) {
			circleObj.tickColor = obj.ranges[i].color;
			sliceAngle = obj.sweepAngle / 100 * obj.ranges[i].size;
			circleObj.startAngle = circleObj.endAngle;
			circleObj.endAngle = circleObj.endAngle + degreesToRadians(sliceAngle);
			circleObj.radius = drawRadius;
			drawPie(contextEl, circleObj);
		}
		if (obj.enableAnimation)
			drawRadius += animationRadiusVariation;
	}
	function degreesToRadians(degrees) {
        return (Math.PI / 180) * degrees
    }
	function drawPie(ctx, obj) {
        ctx.fillStyle = obj.tickColor;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.arc(centerX, centerY, obj.radius, obj.startAngle, obj.endAngle);
		ctx.closePath();
		ctx.fill();
    }
}
