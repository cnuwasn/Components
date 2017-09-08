document.pie = function(id, obj) {
    var pie = document.getElementById(id);
    var width = pie.width;
    var height = pie.height;
    var centerX = width/2;
    var centerY = height/2;
    var outercircleRadius = 250;
    var contextEl = pie.getContext("2d");
	var tickColor,sliceAngle,startAngle;
	var endAngle = degreesToRadians(270);
	drawPieChart();
	function drawPieChart() {
		for (var i = 0, l = obj.length; i < l; i++) {
			tickColor = obj[i].color,
			sliceAngle = 3.6 * obj[i].size,
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
