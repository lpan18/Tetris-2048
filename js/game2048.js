
function GameInstance() {
    var n = 4;
    var board = [];
    var maxTileN = 2048;

    this.Initialize = function(){
    	// Initialize the board
    	for(var i = 0; i < n; i++){
    		board.push([]);
    		for(var j = 0; j < n; j++){
    			board[i].push(0);
    		}
    	}
        AddANewTile();
        AddANewTile();
    }

    this.MoveLeft = function(){
    	for(var i = 0; i < n; i++){
    		MoveRowLeft(i, board);
    	}
    	Update();
    };

    this.MoveRight = function(){
    	for(var i = 0; i < n; i++){
    		MoveRowRight(i, board);
    	}
    	Update();
    }

    this.MoveUp = function(){
    	for(var j = 0; j < n; j++){
    		MoveColumnUp(j, board);
    	}
    	Update();
    }

    this.MoveDown = function(){
    	for(var j = 0; j < n; j++){
    		MoveColumnDown(j, board);
    	}
    	Update();
    }

    var Update = function(){
        if(!IsBoardFull(board)){
        	AddANewTile();
        }
    }

    var AddANewTile = function(){
    	var emptySpots = [];
    	for(var i = 0; i < n; i++){
    		for(var j = 0; j < n; j++){
    			if(board[i][j] === 0)
    			{
    				emptySpots.push([i, j]);
    			}
    		}
    	}

    	if(emptySpots.length > 0){
    		var k = Math.floor(Math.random() * emptySpots.length);
    		var spot = emptySpots[k];
    		var l = Math.floor(Math.random() * 10);
    		if(l === 9)
    		{
    			board[spot[0]][spot[1]] = 4;
    		}
    		else
    		{
    			board[spot[0]][spot[1]] = 2;
    		}
    	}
    };

    var MoveRowLeft = function(i, boardToMove){
    	if (i >= 0 && i < n){
    		var leftMostColumnMerged = -1;
    		for (var j = 1; j < n; j++){
    			// continue to the next tile
    			if (boardToMove[i][j] === 0)
    				continue;

    			var columnToMerge = j;
    			// Try to find the left-most tile on row i whose tile is 0
    			// and column index smaller than j.
    			// If we can find it, replace board i,k with board i,j
    			for (var k = 0; k < j; k++){
    				if (boardToMove[i][k] === 0){
    					boardToMove[i][k] = boardToMove[i][j];
    					boardToMove[i][j] = 0;
    					columnToMerge = k;
    					break;
    				}
    			}

    			if (columnToMerge > 0 && columnToMerge - 1 > leftMostColumnMerged){
    				if (boardToMove[i][columnToMerge - 1] === boardToMove[i][columnToMerge]){
    					boardToMove[i][columnToMerge - 1] = boardToMove[i][columnToMerge - 1] + boardToMove[i][columnToMerge];
    					boardToMove[i][columnToMerge] = 0;
    					leftMostColumnMerged = columnToMerge - 1;
    				}
    			}
    		}
    	}
    };

    var MoveRowRight = function(i, boardToMove){
    	if(i >= 0 && i < n){
    		var rightMostColumnMerged = n;
    		for(var j = n - 2; j >= 0; j--){
    			// continue to the next tile
                if (boardToMove[i][j] === 0)
                    continue;

                var columnToMerge = j;

                for(var k = n - 1; k > j; k--){
                    if (boardToMove[i][k] === 0){
                        boardToMove[i][k] = boardToMove[i][j];
                        boardToMove[i][j] = 0;
                        columnToMerge = k;
                        break;
                    }
                }

                if (columnToMerge < n - 1 && columnToMerge + 1 < rightMostColumnMerged){
                    if (boardToMove[i][columnToMerge + 1] === boardToMove[i][columnToMerge]){
                        boardToMove[i][columnToMerge + 1] = boardToMove[i][columnToMerge + 1] + boardToMove[i][columnToMerge];
                        boardToMove[i][columnToMerge] = 0;
                        rightMostColumnMerged = columnToMerge + 1;
                    }
                }
    		}
    	}
    }

    var MoveColumnUp = function(j, boardToMove){
    	if(j >= 0 && j < n){
    		var topMostRowMerged = -1;
    		for(var i = 1; i < n; i++){
    			// continue to the next tile
                if (boardToMove[i][j] === 0)
                    continue;

                var rowToMerge = i;

                for (var k = 0; k < i; k++)
                {
                    if (boardToMove[k][j] === 0)
                    {
                        boardToMove[k][j] = boardToMove[i][j];
                        boardToMove[i][j] = 0;
                        rowToMerge = k;
                        break;
                    }
                }

                if (rowToMerge > 0 && rowToMerge - 1 > topMostRowMerged)
                {
                    if (boardToMove[rowToMerge - 1][j] === boardToMove[rowToMerge][j])
                    {
                        boardToMove[rowToMerge - 1][j] = boardToMove[rowToMerge - 1][j] + boardToMove[rowToMerge][j];
                        boardToMove[rowToMerge][j] = 0;
                        topMostRowMerged = rowToMerge - 1;
                    }
                }
    		}
    	}
    }

    var MoveColumnDown = function(j, boardToMove){
    	if(j >= 0 && j < n){
    		var bottomMostRowMerged = n;
    		for(var i = n - 2; i >= 0; i--){
    			if (boardToMove[i][j] === 0)
                    continue;

                var rowToMerge = i;

                for (var k = n - 1; k > i; k--)
                {
                    if (boardToMove[k][j] === 0)
                    {
                        boardToMove[k][j] = boardToMove[i][j];
                        boardToMove[i][j] = 0;
                        rowToMerge = k;
                        break;
                    }
                }

                if (rowToMerge < n - 1 && rowToMerge + 1 < bottomMostRowMerged)
                {
                    if (boardToMove[rowToMerge + 1][j] === boardToMove[rowToMerge][j])
                    {
                        boardToMove[rowToMerge + 1][j] = boardToMove[rowToMerge + 1][j] + boardToMove[rowToMerge][j];
                        boardToMove[rowToMerge][j] = 0;
                        bottomMostRowMerged = rowToMerge + 1;
                    }
                }
    		}
    	}
    };

    var WinCondition = function(){
    	var win = false;
    	for(var i = 0; i < n; i++){
    		for(var j = 0; j < n; j++){
    			if(board[i][j] === maxTileN){
    				return true;
    			}
    		}
    	}
    	return win;
    };

    var LoseCondition = function(){
    	var lose = TryMoveLeft() && TryMoveRight() && TryMoveUp() && TryMoveDown();
    	return lose;
    }

    var TryMoveLeft = function(){
    	var boardCopy = GetBoardCopy();

    	for(var i = 0; i < n; i++){
    		MoveRowLeft(i, boardCopy);
    	}

    	return IsBoardFull(boardCopy);
    }

    var TryMoveRight = function(){
    	var boardCopy = GetBoardCopy();

    	for(var i = 0; i < n; i++){
    		MoveRowRight(i, boardCopy);
    	}

    	return IsBoardFull(boardCopy);
    }

    var TryMoveUp = function(){
    	var boardCopy = GetBoardCopy();

    	for(var j = 0; j < n; j++){
    		MoveColumnUp(j, boardCopy);
    	}

    	return IsBoardFull(boardCopy);
    }

    var TryMoveDown = function(){
    	var boardCopy = GetBoardCopy();

    	for(var j = 0; j < n; j++){
    		MoveColumnDown(j, boardCopy);
    	}

    	return IsBoardFull(boardCopy);
    }

    var IsBoardFull = function(boardToCheck){
    	for(var i = 0; i < n; i++){
    		for(var j = 0; j < n; j++){
    			if(boardToCheck[i][j] === 0){
    				return false;
    			}
    		}
    	}
    	return true;
    }

    var GetBoardCopy = function(){
    	var boardCopy = [];
    	for(var i = 0; i < n; i++){
    		boardCopy.push([]);
    		for(var j = 0; j < n; j++){
    			boardCopy[i].push(board[i][j]);
    		}
    	}
    	return boardCopy;
    }

	this.LoadUI = function(){
		var table1 = document.createElement('table');
		table1.id = 'Game2048';
		for(var i = 0; i < 4; i++){
			var row = document.createElement('tr');
			for(var j = 0; j < 4; j++){
				var cell = document.createElement('td');
				row.appendChild(cell);
			}
			table1.appendChild(row);
		}
		$('.gameContainer').append(table1);
	}

	this.Draw = function(){
		for(var i = 0; i < n; i++){
			for(var j = 0; j < n; j++){
				var cell = $("table tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")");
				cell.css('text-align', 'center');
				cell.css('vertical-align', 'middle');
				cell.css('font-size', GetFontSize(board[i][j]));
				cell.css('color', GetTextColor(board[i][j]));
				cell.css('background-color', GetBackgroundColor(board[i][j]));
				cell.text(GetText(board[i][j]));
			}
		}
	}

	var GetFontSize = function(n){
		if(n < 16){
			return '70px';
		}else if(n < 128){
			return '60px';
		}else if(n < 1024){
			return '50px';
		}else{
			return '40px';
		}
	}

	var GetTextColor = function(n){
		if(n > 8){
			return 'white';
		}
		else{
			return 'gray';
		}
	}

	var GetBackgroundColor = function(n){
		var pOfTwo = 0;
		if(n > 0){
			while(n % 2 === 0){
				pOfTwo++;
				n /= 2;
			}
		}

		switch(pOfTwo% 12){
			case 0:
				return 'Silver';
			case 1:
				return 'WhiteSmoke';
			case 2:
				return 'Ivory';
			case 3:
				return 'AntiqueWhite';
			case 4:
				return 'DarkSalmon';
			case 5:
				return 'DarkOrange';
			case 6:
				return 'LightPink';
			case 7:
				return 'Chocolate';
			case 8:
				return 'Brown';
			case 9:
				return 'PeachPuff';
			case 10:
				return 'PaleVioletRed';
			case 11:
				return 'Tomato';
			case 12:
				return 'RosyBrown';
		}
		return 'DarkSalmon';
	}

	var GetText = function(n){
		if(n != 0){
			return n;
		}else{
			return "";
		}
	}

	this.CheckGameStatus = function(){
		var win = WinCondition();
		var lose = LoseCondition();
		if(win){
			$(".gameContainer").css( "opacity", .3);
			alert("You win. Congratulations!");
		}
		else if(lose){
			$(".gameContainer").css( "opacity", .3);
			alert("You lose. Refresh the page to try again");
		}
	}
}

jQuery(document).ready(function($) {
    // Code here will be executed on document ready. Use $ as normal.
    var Game1 = new GameInstance();
    Game1.Initialize();
    Game1.LoadUI();
	Game1.Draw();

	$(document).keydown(function(key) {
        switch(parseInt(key.which,10)) {
			// Left arrow
			case 37:
			    Game1.MoveLeft();
			    Game1.Draw();
				Game1.CheckGameStatus();
				break;
			// Up Arrow
			case 38:
				Game1.MoveUp();
				Game1.Draw();
				Game1.CheckGameStatus();
				break;
			// Right Arrow
			case 39:
				Game1.MoveRight();
				Game1.Draw();
				Game1.CheckGameStatus();
				break;
			// Down Array
			case 40:
				Game1.MoveDown();
				Game1.Draw();
				Game1.CheckGameStatus();
				break;
		}
	});

	var ar = new Array(33,34,35,36,37,38,39,40);

	$(document).keydown(function(e) {
		var key = e.which;
		if($.inArray(key,ar) > -1) {
			e.preventDefault();
			return false;
		}
		return true;
	});
});