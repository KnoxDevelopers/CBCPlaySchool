class GameGrid {
    constructor(rows = 5, cols = 5) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = Math.min(
            (app.screen.width * 0.8) / cols,
            (app.screen.height * 0.5) / rows
        );
        this.container = new PIXI.Container();
        this.grid = [];
        this.playerPosition = { x: 0, y: 0 };
        
        this.createGrid();
        this.addPlayer();
    }
    
    createGrid() {
        // Calculate starting position to center the grid
        const gridWidth = this.cols * this.cellSize;
        const gridHeight = this.rows * this.cellSize;
        const startX = (app.screen.width - gridWidth) / 2;
        const startY = (app.screen.height - gridHeight) / 2;
        
        // Create grid cells
        for (let row = 0; row < this.rows; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const cell = new PIXI.Graphics()
                    .beginFill(0xFFFFFF, 0.3)
                    .drawRect(0, 0, this.cellSize - 2, this.cellSize - 2)
                    .endFill();
                
                cell.x = startX + col * this.cellSize;
                cell.y = startY + row * this.cellSize;
                
                this.container.addChild(cell);
                this.grid[row][col] = cell;
            }
        }
        
        // Add grid to stage
        app.stage.addChild(this.container);
    }
    
    addPlayer() {
        this.player = new PIXI.Sprite(PIXI.Texture.from('player'));
        this.player.anchor.set(0.5);
        this.player.width = this.cellSize * 0.8;
        this.player.height = this.cellSize * 0.8;
        
        this.updatePlayerPosition();
        this.container.addChild(this.player);
    }
    
    updatePlayerPosition() {
        const cell = this.grid[this.playerPosition.y][this.playerPosition.x];
        this.player.x = cell.x + this.cellSize / 2;
        this.player.y = cell.y + this.cellSize / 2;
    }
    
    movePlayer(direction) {
        // Validate movement
        // Then update playerPosition and call updatePlayerPosition()
    }
}