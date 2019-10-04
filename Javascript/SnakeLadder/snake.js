window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext("2d");
    var button = document.getElementById('trigger');
    var numberOfPlayers = getNumberOfPlayers();
    var inCompleteList = [];
    var currentplayerIndex = 0;
    var colorOrder=['red','blue','yellow','green'].slice(0, numberOfPlayers);
    var playerValueIndex = [0,0,0,0].slice(0, numberOfPlayers);;
    var pointPosition= {5:35,9:51,23:42,48:86,69:91,62:83,82:20,95:38,87:66,56:8,49:7,36:5};
    button.addEventListener('click', function(){
         var currentValue = Math.floor(Math.random() * 6) + 1;
         button.className = 'dice-'+colorOrder[currentplayerIndex]+'-'+currentValue;
         button.style.pointerEvents = "none";
         setTimeout(function(){
            updateBoard(currentValue);
            checkSnakeOrLadder();
            if(inCompleteList.length > 1){
                button.className = 'dice-'+colorOrder[currentplayerIndex];
         button.style.pointerEvents = "auto";
            }
         },1000);
    });
    var reset = document.getElementById('reset');
    reset.addEventListener('click', function(){
        ctx.clearRect(0, 0, 500, 500);
        document.getElementById('reset').classList.add('hide');
        document.getElementById('trigger').classList.remove('hide');
        playerValueIndex=[0,0,0,0];
        currentplayerIndex = 0;
        button.className = 'dice-red';
    });
    function getNumberOfPlayers(){
        var count = prompt("Number of Players", "2");
        if(count > 4){
            return 4;
        } else {
            return parseInt(count);
        }
    }
    function drawPin(pin){
        ctx.save();
        ctx.translate(pin.x,pin.y);
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(2,-10,-15,-25,0,-30);
        ctx.bezierCurveTo(15,-25,-2,-10,0,0);
        ctx.fillStyle=pin.color;
        ctx.fill();
        ctx.strokeStyle="black";
        ctx.lineWidth=1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0,-21,3,0,Math.PI*2);
        ctx.closePath();
        ctx.fillStyle="black";
        ctx.fill();
        ctx.restore();
    }
    function updateBoard(currentValue) {
        if(playerValueIndex[currentplayerIndex] > 0 || currentValue ===1 ) {
            playerValueIndex[currentplayerIndex] = playerValueIndex[currentplayerIndex] + currentValue > 100 ? playerValueIndex[currentplayerIndex] : playerValueIndex[currentplayerIndex] + currentValue;
            drawBoard();
        }
        inCompleteList = playerValueIndex.slice(0, numberOfPlayers).filter(function(value){
            return value < 100;
        })
        if(inCompleteList.length > 1){
            do {
                currentplayerIndex = currentplayerIndex + 1 === numberOfPlayers ? 0 : currentplayerIndex+1;
            }
            while (playerValueIndex[currentplayerIndex] === 100);
        }
        else {
            alert("Great!!!....Finished!!!!");
            document.getElementById('trigger').classList.add('hide');
            document.getElementById('reset').classList.remove('hide');
        }
    }
    function drawBoard(){
        ctx.clearRect(0, 0, 500, 500);
        playerValueIndex.slice(0, numberOfPlayers).forEach(function(val,playerIndex){
            if(val > 0 && val <=100) {
                var index = calcPosition(val, playerIndex);
                drawPin({x:index[0], y:index[1], color:colorOrder[playerIndex]});
            }
        });
    }
    function calcPosition(val,playerIndex){
        var index=[];
        var indexCount = [];
        var row = Math.floor((val-1)/10);
        var column = (row + 1) % 2 === 0 ? 10 - (val%10) : (val-1)%10;
        column = column == 10 ? 0 : column;
        index = [(column * 50) + 10,500 - (row * 50) - 25];
        if(playerIndex > 0) {
            indexCount = playerValueIndex.slice(0, numberOfPlayers).filter(function(value,sliceIndex){
                return value === val && sliceIndex < playerIndex;
            });
        }
        if(indexCount.length > 0){
            if(indexCount.length === 1){
                index[0] =  index[0] + 20;
            }
            else if(indexCount.length === 2){
                index[1] =  index[1] + 20;
            }
            else if(indexCount.length === 3){
                index[0] =  index[0] + 20;
                index[1] =  index[1] + 20;
            }
        }
        return index;
    }
    function checkSnakeOrLadder(){
        playerValueIndex.forEach(function(val,index){
            Object.keys(pointPosition).forEach(function(key,objIndex) {
                if(parseInt(key) === val){
                    playerValueIndex[index] = pointPosition[key];
                    setTimeout(drawBoard, 500);
                }
            });
        });
    }

};
