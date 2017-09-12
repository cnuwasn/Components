document.pie = function (id, obj) {
    var pie = document.getElementById(id);
    var centerX, centerY, egendPosition;
	if (pie.width > pie.height) {
		centerX = pie.height / 2;
		centerY = centerX;
		legendPosition = "right";
	} else {
		centerX = pie.width / 2;
		centerY = centerX;
		legendPosition = "bottom";
	}
	var inputradius = obj.radius;
    var outercircleRadius = (((centerX > centerY) ? centerY : centerX) > inputradius) ? inputradius : ((centerX > centerY) ? centerY : centerX);
    var contextEl = pie.getContext("2d");
	var tickColor, sliceAngle;
	var startAngle = obj.startAngle;
	var endAngle = degreesToRadians(startAngle);
	var animationRadiusVariation = outercircleRadius/ 10;
	var startAnimation, drawRadius = 0;
	var sweep = obj.sweepAngle;
	var circleObj = {
		startAngle: startAngle,
		endAngle: endAngle
	};
	if (obj.enableAnimation) {
		drawRadius = animationRadiusVariation;
		sweep = 36;
		startAnimation = setInterval(drawPieChart, 25);
	}
	else {
		drawRadius = outercircleRadius;
		drawPieChart();
	}
	function drawPieChart() {
		circleObj.endAngle = degreesToRadians(obj.startAngle);
		contextEl.clearRect(0, 0, pie.width, pie.height);
		if (obj.enableAnimation && sweep >= obj.sweepAngle && drawRadius >= outercircleRadius ) {
			drawRadius = outercircleRadius;
			sweep = obj.sweepAngle;
			clearInterval(startAnimation);
			if (obj.dropShadow)
				drawShadow();
		}
		for (var i = 0; i < obj.ranges.length; i++) {
			circleObj.tickColor = obj.ranges[i].color;
			sliceAngle = sweep / 100 * obj.ranges[i].size;
			circleObj.startAngle = circleObj.endAngle;
			circleObj.endAngle = circleObj.endAngle + degreesToRadians(sliceAngle);
			circleObj.radius = drawRadius;
			drawPie(contextEl, circleObj);
		}
		if (obj.enableAnimation) {
			drawRadius += animationRadiusVariation;
			sweep += 36;
		}
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
	function drawShadow() {
		var x = centerX / 15,
			y = centerY + outercircleRadius,
			innerRadius = 5,
			radius = outercircleRadius / 20;
		contextEl.scale(15, 1);
		var gradient = contextEl.createRadialGradient(x, y, innerRadius, x, y, outercircleRadius);
		gradient.addColorStop(0, '#f6f6f6');
		gradient.addColorStop(0.1, 'white');
		gradient.addColorStop(1, '#8c8c8c');

		contextEl.arc(x, y, radius, 0, 2 * Math.PI);
		contextEl.fillStyle = gradient;
		contextEl.fill();
		contextEl.scale(1 / 15, 1);
	}
}
