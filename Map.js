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
        this.lastObjectID = 0;

        for (let i = 0; i < width; i++) {
            this.grid[i] = [];
            for (let j = 0; j < height; j++) {
                this.grid[i][j] = 0;
            }
        }
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
    }

    get(x, y) {
        if (this.outOfBounds(x, y)) return 0;
        
        return this.grid[x][y];
    }

    getAllWithTag(tag){
        return this.objects.filter(obj => obj.CheckTag(tag));
    }

    deleteGameObject(x, y) {
        if (this.outOfBounds(x, y)) return;
        let object = this.grid[x][y];
        if (object) {
            this.objects.splice(this.objects.indexOf(object), 1);
        }
        this.grid[x][y] = 0;
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
        //draw grid
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.ctx.save();
                this.ctx.strokeStyle = "lightgrey";
                this.ctx.strokeRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
                this.ctx.restore();

                if (this.grid[i][j] != 0) {
                    this.grid[i][j].Draw();
                }
            }
        }

    }
}