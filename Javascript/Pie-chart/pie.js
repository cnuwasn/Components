document.pie = function(id, obj) {
    var pie = document.getElementById(id);
    var width = pie.width;
    var height = pie.height;
    var centerX = width/2;
    var centerY = height/2;
    var outercircleRadius = obj.radius;
    var contextEl = pie.getContext("2d");
	var tickColor,sliceAngle;
	var startAngle = obj.startangle;
	var endAngle = degreesToRadians(startAngle);
	drawPieChart();
	function drawPieChart() {
		for (var i = 0, l = obj.ranges.length; i < l; i++) {
			tickColor = obj.ranges[i].color,
			sliceAngle = obj.circleangle / 100 * obj.ranges[i].size,
			startAngle = endAngle,
			endAngle = endAngle + degreesToRadians(sliceAngle),
			drawPie(contextEl,obj);
		}
	}
	function degreesToRadians(degrees) {
        return (Math.PI / 180) * degrees
    }
	function drawPie(ctx,obj){
        ctx.fillStyle = tickColor;
		ctx.beginPath();
		ctx.moveTo(centerX,centerY);
		ctx.arc(centerX, centerY, outercircleRadius, startAngle, endAngle);
		ctx.closePath();
		ctx.fill();
    }
}
