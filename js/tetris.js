// Simple 2D Vector
function Vector2D(x, y) {
	this.X = x;
	this.Y = y;
}

// Shape of a Tetromino
function Shape(ShapeName, ShapeID, north, east, south, west) {
	this.ShapeName = ShapeName;
    this.ShapeID = ShapeID;
	this.North = north;
	this.East = east;
	this.South = south;
	this.West = west;
	this.NOfSquares = 4;
}

// Direction Enums
var DirectionEnum = {"North":1, "East":2, "South":3, "West":4};

// Tetromino Class
function Tetromino(shape, game) {
	this.Direction = DirectionEnum.North;
	this.Shape = shape;
	this.Center = new Vector2D(0,0);
	this.SquarePositions = [];
	// A reference to the current GameTetris instance
	this.Game = game;

	this.Initialize = function(){
		for(var i = 0; i < this.Shape.NOfSquares; i++){
			this.SquarePositions.push(new Vector2D(0,0));
		}
		this.UpdateSquarePositions();
	};

	this.UpdateSquarePositions = function(){
	    for(var i = 0; i < this.Shape.NOfSquares; i++){
	    	switch(this.Direction){
				case DirectionEnum.North:
				    this.SquarePositions[i].X = this.Center.X + this.Shape.North[i].X;
				    this.SquarePositions[i].Y = this.Center.Y + this.Shape.North[i].Y;
				    break;
				case DirectionEnum.East:
				    this.SquarePositions[i].X = this.Center.X + this.Shape.East[i].X;
				    this.SquarePositions[i].Y = this.Center.Y + this.Shape.East[i].Y;
				    break;
				case DirectionEnum.South:
				    this.SquarePositions[i].X = this.Center.X + this.Shape.South[i].X;
				    this.SquarePositions[i].Y = this.Center.Y + this.Shape.South[i].Y;
				    break;
				case DirectionEnum.West:
				    this.SquarePositions[i].X = this.Center.X + this.Shape.West[i].X;
				    this.SquarePositions[i].Y = this.Center.Y + this.Shape.West[i].Y;
				    break;
			}
	    }
	};


	this.SetAsNext = function(){
	};

	this.StartFall = function(){
		this.Center.X = Math.round(this.Game.cWidth/2) - 1;
		this.Center.Y = 0;
		this.UpdateSquarePositions();
	};

	this.Rotate = function(){
		var canRotate = true;
		var oldDirection = this.Direction;

		if(this.Direction < 4){
			this.Direction++;
		}
		else{
			this.Direction = 1;
		}
		this.UpdateSquarePositions();

		if(this.Game.CheckCollision(this)){
			canRotate = false;
			this.Direction = oldDirection;
			this.UpdateSquarePositions();
		}

		return canRotate;
	};

	this.MoveDown = function(){
		var canMoveDown = true;
		var oldY = this.Center.Y;

		this.Center.Y++;
		this.UpdateSquarePositions();

		if(this.Game.CheckCollision(this)){
			canMoveDown = false;
			this.Center.Y = oldY;
			this.UpdateSquarePositions();
		}

		return canMoveDown;
	};

	this.MoveLeft = function(){
		var canMoveLeft = true;
		var oldX = this.Center.X;

		this.Center.X--;
		this.UpdateSquarePositions();

		if(this.Game.CheckCollision(this)){
			canMoveLeft = false;
			this.Center.X = oldX;
			this.UpdateSquarePositions();
		}
	}

	this.MoveRight = function(){
		var canMoveRight = true;
		var oldX = this.Center.X;

		this.Center.X++;
		this.UpdateSquarePositions();

		if(this.Game.CheckCollision(this)){
			canMoveRight = false;
			this.Center.X = oldX;
			this.UpdateSquarePositions();
		}
	}
}

function GameTetris(w, h) {
	this.level = 1;
    this.score = 0;
    this.gameInProgress = true;

	this.container = [];

	this.cWidth = w;
	this.cHeight = h;
    this.ShapeList = [];

    this.currentTtrmino = null;
    this.nextTtrmino = null;

    var me = this;
    var timer;

    this.Initialize = function(){
        // Initialize the container
        for(var i = 0; i < this.cWidth; i++){
            this.container.push([]);
            for(var j = 0; j < this.cHeight; j++){
                this.container[i].push(0);
            }
        }

    	this.InitializeShapeList();
    }

    this.StartGame = function(){
        this.currentTtrmino = this.GetANewTetromino();
        this.currentTtrmino.Initialize();
        this.currentTtrmino.StartFall();
        this.nextTtrmino = this.GetANewTetromino();
        this.nextTtrmino.Initialize();
        this.nextTtrmino.SetAsNext();

        this.SetTimer();
    }

    this.SetTimer = function(){
    	if(typeof timer === 'undefined' || timer === null){
    	// Timer is undefined or null. Do nothing
        }else{
        	clearInterval(timer);
        }
    	timer = setInterval(function () { me.TtrminoDown(); me.Draw()}, 1000/Math.log(3 * this.level));
    };

    this.InitializeShapeList = function(){
    	// Shape I
    	var IName = "I";
        var IID = 1;
    	var INorth = [new Vector2D(0, -1), new Vector2D(0, 1), new Vector2D(0, 2), new Vector2D(0, 0)];
    	var IEast = [new Vector2D(-1, 0), new Vector2D(1, 0), new Vector2D(2, 0), new Vector2D(0, 0)];
    	var ISouth = INorth;
    	var IWest = IEast;
        var ShapeI = new Shape(IName, IID, INorth, IEast, ISouth, IWest);
        this.ShapeList.push(ShapeI);

        // Shape J
        var JName = "J";
        var JID = 2;
        var JNorth = [new Vector2D(-1, 0), new Vector2D(0, -1), new Vector2D(0, -2), new Vector2D(0, 0)];
        var JEast = [new Vector2D(0, -1), new Vector2D(1, 0), new Vector2D(2, 0), new Vector2D(0, 0)];
        var JSouth = [new Vector2D(1, 0), new Vector2D(0, 1), new Vector2D(0, 2), new Vector2D(0, 0)];
        var JWest = [new Vector2D(0, 1), new Vector2D(-1, 0), new Vector2D(-2, 0), new Vector2D(0, 0)];
        var ShapeJ = new Shape(JName, JID, JNorth, JEast, JSouth, JWest);
        this.ShapeList.push(ShapeJ);

        // Shape L
        var LName = "L";
        var LID = 3;
        var LNorth = [new Vector2D(1, 0), new Vector2D(0, -1), new Vector2D(0, -2), new Vector2D(0, 0)];
        var LEast = [new Vector2D(0, 1), new Vector2D(1, 0), new Vector2D(2, 0), new Vector2D(0, 0)];
        var LSouth = [new Vector2D(-1, 0), new Vector2D(0, 1), new Vector2D(0, 2), new Vector2D(0, 0)];
        var LWest = [new Vector2D(0, -1), new Vector2D(-1, 0), new Vector2D(-2, 0), new Vector2D(0, 0)];
        var ShapeL = new Shape(LName, LID, LNorth, LEast, LSouth, LWest);
        this.ShapeList.push(ShapeL);

        // Shape O
        var OName = "O";
        var OID = 4;
        var ONorth = [new Vector2D(1, 0), new Vector2D(0, 1), new Vector2D(1, 1), new Vector2D(0, 0)];
        var OEast = ONorth;
        var OSouth = ONorth;
        var OWest = ONorth;
        var ShapeO = new Shape(OName, OID, ONorth, OEast, OSouth, OWest);
        this.ShapeList.push(ShapeO);

        // Shape S
        var SName = "S";
        var SID = 5;
        var SNorth = [new Vector2D(-1, 0), new Vector2D(0, -1), new Vector2D(1, -1), new Vector2D(0, 0)];
        var SEast = [new Vector2D(0, -1), new Vector2D(1, 0), new Vector2D(1, 1), new Vector2D(0, 0)];
        var SSouth = SNorth;
        var SWest = SEast;
        var ShapeS = new Shape(SName, SID, SNorth, SEast, SSouth, SWest);
        this.ShapeList.push(ShapeS);

        // Shape T
        var TName = "T";
        var TID = 6;
        var TNorth = [new Vector2D(-1, 0), new Vector2D(1, 0), new Vector2D(0, 1), new Vector2D(0, 0)];
        var TEast = [new Vector2D(0, -1), new Vector2D(0, 1), new Vector2D(-1, 0), new Vector2D(0, 0)];
        var TSouth = [new Vector2D(1, 0), new Vector2D(-1, 0), new Vector2D(0, -1), new Vector2D(0, 0)];
        var TWest = [new Vector2D(0, 1), new Vector2D(0, -1), new Vector2D(1, 0), new Vector2D(0, 0)];
        var ShapeT = new Shape(TName, TID, TNorth, TEast, TSouth, TWest);
        this.ShapeList.push(ShapeT);

        // Shape Z
        var ZName = "Z";
        var ZID = 7;
        var ZNorth = [new Vector2D(-1, 0), new Vector2D(0, 1), new Vector2D(1, 1), new Vector2D(0, 0)];
        var ZEast = [new Vector2D(0, -1), new Vector2D(-1, 0), new Vector2D(-1, 1), new Vector2D(0, 0)];
        var ZSouth = ZNorth;
        var ZWest = ZEast;
        var ShapeZ = new Shape(ZName, ZID, ZNorth, ZEast, ZSouth, ZWest);
        this.ShapeList.push(ShapeZ);
    }

    this.UpdateScoreAndLevel = function(linesRemoved){
    	switch(linesRemoved){
    		case 1:
    			this.score += 100;
    			break;
    		case 2:
    			this.score += 300;
    			break;
    		case 3:
    		    this.score += 500;
    		    break;
    		case 4:
    			this.score += 800;
    			break;
    	}

    	// Update level
    	var oldLevel = this.level;
    	var newLevel = Math.floor(this.score/1500) + 1;
    	this.level = newLevel;
    	// Reset timer if necessary
    	if(newLevel > oldLevel){
    		this.SetTimer();
    	}
    }

    this.GetANewTetromino = function(){
    	var i = Math.floor(Math.random() * this.ShapeList.length);
    	var shape = this.ShapeList[i];
    	return new Tetromino(shape, this);
    };

    this.FallNextTtrmino = function(){
    	this.currentTtrmino = this.nextTtrmino;
        this.currentTtrmino.StartFall();
        this.nextTtrmino = this.GetANewTetromino();
        this.nextTtrmino.Initialize();
        this.nextTtrmino.SetAsNext();
    };

    this.TtrminoLeft = function(){
        if(typeof this.currentTtrmino != 'undefined' && this.currentTtrmino != null){
            this.currentTtrmino.MoveLeft();
        }
    }

    this.TtrminoRight = function(){
        if(typeof this.currentTtrmino != 'undefined' && this.currentTtrmino != null){
    	    this.currentTtrmino.MoveRight();
        }
    }

    this.TtrminoRotate = function(){
        if(typeof this.currentTtrmino != 'undefined' && this.currentTtrmino != null){
    	    this.currentTtrmino.Rotate();
        }
    }

    this.TtrminoDown = function(){
        if(typeof this.currentTtrmino != 'undefined' && this.currentTtrmino != null){
            var canMoveDown = this.currentTtrmino.MoveDown();
    	    if(!canMoveDown){
    		    var validLanding = this.TetrominoToPile(this.currentTtrmino);
    		    if(validLanding){
    			    this.FallNextTtrmino();
    			    var NOfLines = this.RemoveCompleteLines();
    			    this.UpdateScoreAndLevel(NOfLines);
    		    }else{
                    clearInterval(timer);
                    alert("You lost. Refresh the page to start again.");
                }
    	    }
        }
    }

    // Check if the input Ttrmino is in collision with the boundary or pile of squares.
    this.CheckCollision = function(Ttrmino){
        var collision = false;
        // Loop through all Square positions
        for(var i = 0; i < Ttrmino.SquarePositions.length; i++){
        	var p = Ttrmino.SquarePositions[i];
        	// First check if x is within the range and y is higher than the bottom line of the container
        	if(p.X >=0 && p.X < this.cWidth && p.Y < this.cHeight){
        		// Then check if y is lower than the top line
        		if(p.Y >= 0){
        			// Next check if the point is conflict with the block pile
        			if(this.container[p.X][p.Y] != 0){
        				collision = true;
        				break;
        			}else{
        				// DO NOTHING
        			}
        		}else{
        			// If y is higher than the top line, DO NOTHING
        		}
        	}else{
        		collision = true;
        		break;
        	}
        }
        return collision;
    }

    // Transform a Tetromino into the pile of squares.
    // Return true if the tetromino is within the boundary, false if out of boundary or in collision with the pile
    this.TetrominoToPile = function(Ttrmino){
    	var success = true;
        //Check if the tetromino is in collision with the left, right, bottom boundary and the pile
        if(this.CheckCollision(Ttrmino)){
        	return false;
        }else{
        	for(var i = 0; i < Ttrmino.SquarePositions.length; i++){
        		var p = Ttrmino.SquarePositions[i];
        		//Check if the point is within the boundary
        		if(p.X >=0 && p.X < this.cWidth && p.Y < this.cHeight && p.Y >=0){
        			this.container[p.X][p.Y] = Ttrmino.Shape.ShapeID;
        		}
        		else{
        			return false;
        		}
        	}
        }
        return true;
    };

    // Remove lines that are completely filled with squares
    this.RemoveCompleteLines = function(){
    	// First, check complete lines and add to completed
    	var completedLines = [];
    	for(var y = 0; y < this.cHeight; y++){
    		if(this.CheckLineComplete(y)){
    			completedLines.push(y);
    		}
    	}

    	// Then, scan from bottom to top, move incomplete lines down
        if(completedLines.length > 0){
        	var moveDown = 0;
        	for(var y = this.cHeight - 1; y >=0; y--){
        		var toFind = y;
        		// If a line is complete
        		if(completedLines.indexOf(toFind) > -1){
        			moveDown++;
        		}else{
        			// If a line is incomplete, move it down by integer moveDown
                    // Note that y + moveDown is guaranteed to be smaller than this.cHeight
                    for(var x = 0; x < this.cWidth; x++){
                    	this.container[x][y+moveDown] = this.container[x][y];
                    }
        		}
        	}
        	// In the end, fill in the top severl lines with 0
        	for(var y = 0; y < moveDown; y++){
        		for(var x = 0; x < this.cWidth; x++){
        			this.container[x][y] = 0;
        		}
        	}
        }
        return completedLines.length;
    };

    // Check if a certain line is complete or not
    this.CheckLineComplete = function(y){
    	if(y >=0 && y < this.cHeight){
    		for(var x = 0; x < this.cWidth; x++){
    			if(this.container[x][y] === 0){
    				return false;
    			}
    		}
    	}else{
    		console.log("Wrong Line Number");
    	}
        return true;
    };

	this.LoadUI = function(){
        var divMain = document.createElement('div');
        divMain.className = 'Tetris';
        $('.gameContainer').append(divMain);

        var divSide = document.createElement('div');
        divSide.className = 'Tetris';
        $('.gameContainer').append(divSide);

		var tableMain = document.createElement('table');
		tableMain.id = 'TetrisMain';
		for(var i = 0; i < this.cHeight; i++){
			var row = document.createElement('tr');
			for(var j = 0; j < this.cWidth; j++){
				var cell = document.createElement('td');
				row.appendChild(cell);
			}
			tableMain.appendChild(row);
		}
        divMain.appendChild(tableMain);

        var divNext = document.createElement('div');
        divNext.appendChild(document.createTextNode("Next"));
        divSide.appendChild(divNext);

        var tableSide = document.createElement('table');
        tableSide.id = 'TetrisSide';
        for(var i = 0; i < 5; i++){
            var row = document.createElement('tr');
            for(var j = 0; j < 5; j++){
                var cell = document.createElement('td');
                row.appendChild(cell);
            }
            tableSide.appendChild(row);
        }
        divSide.appendChild(tableSide);

        var divLevel = document.createElement('div');
        divLevel.appendChild(document.createTextNode('Level'));
        divSide.appendChild(divLevel);

        var divLevelN = document.createElement('div');
        divLevelN.id = 'Level';
        divLevelN.appendChild(document.createTextNode('1'));
        divSide.appendChild(divLevelN);

        var divScore = document.createElement('div');
        divScore.appendChild(document.createTextNode('Score'));
        divSide.appendChild(divScore);

        var divScoreN = document.createElement('div');
        divScoreN.id = 'Score';
        divScoreN.appendChild(document.createTextNode("0"));
        divSide.appendChild(divScoreN);

        var startButtonDiv = document.createElement('div');
        startButtonDiv.id = 'Start';
        divSide.appendChild(startButtonDiv);

        var startButton = document.createElement('button');
        startButton.type = 'button';
        startButton.id = 'Start';
        startButton.appendChild(document.createTextNode("Start"));
        startButtonDiv.appendChild(startButton);
	}

	this.Draw = function(){
		// Draw main container and square piles
		for(var i = 0; i < this.cHeight; i++){
			for(var j = 0; j < this.cWidth; j++){
				var cell = $("#TetrisMain tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")");
				// cell(i + 1)(j + 1) corresponds to container[j][i]
				cell.css('background-color', this.GetBackgroundColor(this.container[j][i]));
                cell.css('border-right', this.GetBorderStyle(this.container[j][i]));
                cell.css('border-bottom', this.GetBorderStyle(this.container[j][i]));
			}
		}

		// Draw currentTtrmino
		if(typeof this.currentTtrmino != 'undefined' && this.currentTtrmino != null){
			for(var i = 0; i < this.currentTtrmino.SquarePositions.length; i++){
				var c = this.currentTtrmino.SquarePositions[i].X + 1;
				var r = this.currentTtrmino.SquarePositions[i].Y + 1;
				var cell = $("#TetrisMain tr:nth-child(" + r + ") td:nth-child(" + c + ")");
                var id = this.currentTtrmino.Shape.ShapeID;
				cell.css('background-color',this.GetBackgroundColor(id));
                cell.css('border-right', this.GetBorderStyle(id));
                cell.css('border-bottom', this.GetBorderStyle(id));
			}
		}

        // Draw side table and nextTtrmino
        for(var i = 0; i < 5; i++){
            for(var j = 0; j < 5; j++){
                var cell = $("#TetrisSide tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")");
                cell.css('background-color', this.GetBackgroundColor(0));
                cell.css('border-right', this.GetBorderStyle(0));
                cell.css('border-bottom', this.GetBorderStyle(0));
            }
        }

        if(typeof this.nextTtrmino != 'undefined' && this.nextTtrmino != null){
            for(var i = 0; i < this.nextTtrmino.SquarePositions.length; i++){
                var c = this.nextTtrmino.SquarePositions[i].X + 3;
                var r = this.nextTtrmino.SquarePositions[i].Y + 3;
                var cell = $("#TetrisSide tr:nth-child(" + r + ") td:nth-child(" + c + ")");
                var id = this.nextTtrmino.Shape.ShapeID;
                cell.css('background-color',this.GetBackgroundColor(id));
                cell.css('border-right', this.GetBorderStyle(id));
                cell.css('border-bottom', this.GetBorderStyle(id));
            }
        }

        // Update level and score
        var divLevelN = $("div.Tetris #Level");
        divLevelN.empty();
        divLevelN.append(document.createTextNode(this.level));

        var divScoreN = $("div.Tetris #Score");
        divScoreN.empty();
        divScoreN.append(document.createTextNode(this.score));
	}

    this.GetBackgroundColor = function(id){
        switch(id){
            case 0:
                return '#101010';
            case 1:
                return '#D80000';
            case 2:
                return '#FF0099';
            case 3:
                return '#FFFF33';
            case 4:
                return '#33FFFF';
            case 5:
                return '#0066FF';
            case 6:
                return '#C8C8C8';
            case 7:
                return '#66FF33';
        }
    }

    this.GetBorderStyle = function(id){
        switch(id){
            case 0:
                return 'solid 1px LightSlateGray';
            case 1:
                return 'solid 1px #700000';
            case 2:
                return 'solid 1px #990099';
            case 3:
                return 'solid 1px #CC9900';
            case 4:
                return 'solid 1px #0099CC';
            case 5:
                return 'solid 1px #000066';
            case 6:
                return 'solid 1px #383838';
            case 7:
                return 'solid 1px #336633';
        }
    }
}

jQuery(document).ready(function($) {
    // Code here will be executed on document ready. Use $ as normal.
    var Game1 = new GameTetris(10, 18);
    Game1.Initialize();
	Game1.LoadUI();
	Game1.Draw();

    $('div#Start').click(function(){
        Game1.StartGame();
        Game1.Draw();
        $('div#Start').hide();
    })

	$(document).keydown(function(key) {
        switch(parseInt(key.which,10)) {
			// Left arrow
			case 37:
			    Game1.TtrminoLeft();
			    Game1.Draw();
				break;
			// Up Arrow
			case 38:
				Game1.TtrminoRotate();
				Game1.Draw();
				break;
			// Right Arrow
			case 39:
				Game1.TtrminoRight();
				Game1.Draw();
				break;
			// Down Array
			case 40:
				Game1.TtrminoDown();
				Game1.Draw();
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