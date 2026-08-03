class Map {
    constructor(ctx, width, height, cellSize) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        
        this.cellSize = cellSize;
        this.grid = [];
        this.objects = [];
        this.FluidMashines = [];
        this.Pipes = [];
        this.Belts = [];

        this.lastObjectID = 0;

        for (let i = 0; i < width; i++) {
            this.grid[i] = [];
            for (let j = 0; j < height; j++) {
                this.grid[i][j] = 0;
            }
        }

        this.gridCanvas = document.createElement("canvas");
        this.gridCanvas.width = width * cellSize;
        this.gridCanvas.height = height * cellSize;
        this.gridCanvasCtx = this.gridCanvas.getContext("2d");
        this.drawStaticGrid();
    }

    canPlace(object) {
        for (let dx = 0; dx < object.size.width; dx++){
            for (let dy = 0; dy < object.size.height; dy++){
                if(this.outOfBounds(object.x + dx, object.y + dy)){
                    return false;
                }

                if(this.grid[object.x + dx][object.y + dy] != null){
                    return false;
                }
            }   
        }

        return true;
    }

    set(x, y, object) {
        if (this.outOfBounds(x, y)) return;
        if (this.grid[x][y] instanceof GameObject) return;

        object.ID = this.lastObjectID++;
        object.x = x;
        object.y = y;
        object.cellSize = this.cellSize;
        object.leftBound = x * this.cellSize;
        object.rightBound = (x + 1) * this.cellSize;
        object.topBound = y * this.cellSize;
        object.bottomBound = (y + 1) * this.cellSize;

        this.grid[x][y] = object;
        this.objects.push(object);

        if(object.CheckTag("FluidMashine")){
            this.FluidMashines.push(object);
        }
        if(object.CheckTag("Pipe")){
            this.Pipes.push(object);
        }
        if(object.CheckTag("BeltTile")){
            this.Belts.push(object);
        }

        if (typeof object.UpdateJoinDirections === "function") {
            object.UpdateJoinDirections();
        }

        const dirs = [
            {x: 0, y: -1},
            {x: 0, y: 1},
            {x: -1, y: 0},
            {x: 1, y: 0},
        ];

        for (let d of dirs) {
            const neighbor = this.get(x + d.x, y + d.y);
            if (neighbor instanceof Pipe) {
                neighbor.UpdateJoinDirections();
            }
        }
    }

    get(x, y) {
        if (this.outOfBounds(x, y)) return 0;
        
        return this.grid[x][y];
    }

    drawStaticGrid() {
        this.gridCanvasCtx.strokeStyle = "lightgrey";
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.gridCanvasCtx.strokeRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    getAllWithTag(tag){
        return this.objects.filter(obj => obj.CheckTag(tag));
    }

    removeFromArray(array, object) {
        const index = array.indexOf(object);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }

    deleteGameObject(x, y) {
        if (this.outOfBounds(x, y)) return;
        let object = this.grid[x][y];
        if (object) {
            this.objects.splice(this.objects.indexOf(object), 1);
            this.removeFromArray(this.FluidMashines, object);
            this.removeFromArray(this.Pipes, object);
            this.removeFromArray(this.Belts, object);
            this.grid[x][y] = null;
            object.Delete();
        }
    }

    outOfBounds(x, y) {
        return x < 0 || x >= this.width || y < 0 || y >= this.height;
    }

    Start() {
        for (let obj of this.objects) {
            if (obj instanceof GameObject){
                obj.Start();
            }
        }
    }

    Update(){
        let fluidMashine = [];
        let pipes = [];
        let belts = [];
        
        // Single pass to categorize objects
        for (let obj of this.objects) {
            if (obj.CheckTag("FluidMashine")) {
                fluidMashine.push(obj);
            } else if (obj instanceof Pipe) {
                pipes.push(obj);
            }
            else if (obj.CheckTag("BeltTile")) {
                belts.push(obj);
            }
        }
        
        // Update pipes first
        for (let obj of pipes) {
            obj.Update();
        }
        
        // Then update fluidMashine
        for (let obj of fluidMashine) {
            obj.Update();
        }

        for (let obj of belts) {
            obj.Update();
        }
    }

    Draw() {
        this.ctx.drawImage(this.gridCanvas, 0, 0);

        for (let obj of this.objects) {
            obj.Draw();
        }

        for (let i = 0; i < this.Belts.length; i++){
            let belt = this.Belts[i];
            belt.DrawItem();
        }
    }
}