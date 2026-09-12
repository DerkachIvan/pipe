class GameMap {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    cellSize: number;
    grid: (GameObject | null)[][];
    objects: GameObject[];
    FluidMashines: GameObject[];
    Pipes: GameObject[];
    Belts: GameObject[];
    Others: GameObject[];
    lastObjectID: number;

    gridCanvas: HTMLCanvasElement;
    gridCanvasCtx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, cellSize: number) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        
        this.cellSize = cellSize;
        this.grid = [];
        this.objects = [];
        this.FluidMashines = [];
        this.Pipes = [];
        this.Belts = [];
        this.Others = [];

        this.lastObjectID = 0;

        for (let i = 0; i < width; i++) {
            this.grid[i] = [];
            for (let j = 0; j < height; j++) {
                this.grid[i][j] = null;
            }
        }

        this.gridCanvas = document.createElement("canvas");
        this.gridCanvas.width = width * cellSize;
        this.gridCanvas.height = height * cellSize;
        this.gridCanvasCtx = this.gridCanvas.getContext("2d");
        this.drawStaticGrid();
    }

    canPlace(object: GameObject): boolean {
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

        if (!(object instanceof Pipe || object.CheckTag("FluidMashine"))) {
            return true;
        }

        const fluidType = object.fluidType ?? "empty";
        const directions = [
            {x: 0, y: -1},
            {x: 0, y: 1},
            {x: -1, y: 0},
            {x: 1, y: 0},
        ];

        const visited = new Set();
        const fluidTypes = new Set();
        const queue = [];

        for (const dir of directions) {
            const neighbor = this.get(object.x + dir.x, object.y + dir.y);
            if (neighbor instanceof GameObject && (neighbor instanceof Pipe || neighbor.CheckTag("FluidMashine"))) {
                queue.push({x: neighbor.x, y: neighbor.y});
            }
        }

        while (queue.length > 0) {
            const current = queue.shift();
            const key = `${current.x},${current.y}`;
            if (visited.has(key)) continue;
            visited.add(key);

            const node = this.get(current.x, current.y);
            if (node instanceof GameObject && (node instanceof Pipe || node.CheckTag("FluidMashine"))) {
                const type = node.fluidType ?? "empty";
                if (type !== "empty") {
                    fluidTypes.add(type);
                }

                for (const dir of directions) {
                    const nx = current.x + dir.x;
                    const ny = current.y + dir.y;
                    const nextNode = this.get(nx, ny);

                    if (nextNode instanceof GameObject && (nextNode instanceof Pipe || nextNode.CheckTag("FluidMashine"))) {
                        const nextKey = `${nx},${ny}`;
                        if (!visited.has(nextKey)) {
                            queue.push({x: nx, y: ny});
                        }
                    }
                }
            }
        }

        if (fluidType !== "empty") {
            fluidTypes.add(fluidType);
        }

        if (fluidTypes.size > 1) {
            return false;
        }

        return true;
    }

    set(x: number, y: number, object: GameObject) {
        object.x = x;
        object.y = y;
        if(!this.canPlace(object)){
            console.log("Cannot place object at", x, y, "because of fluid mismatch");
            return;
        }

        object.ID = this.lastObjectID++;
        object.cellSize = this.cellSize;
        object.leftBound = x * this.cellSize;
        object.rightBound = (x + object.size.width) * this.cellSize;
        object.topBound = y * this.cellSize;
        object.bottomBound = (y + object.size.height) * this.cellSize;
        this.objects.push(object);
        
        for (let dx = 0; dx < object.size.width; dx++){
            for (let dy = 0; dy < object.size.height; dy++){
                this.grid[x+dx][y+dy] = object;
            }
        }

        if(object.CheckTag("FluidMashine")){
            this.FluidMashines.push(object);
        }
        if(object.CheckTag("Pipe")){
            this.Pipes.push(object);
        }
        if(object.CheckTag("BeltTile", "Loader")){
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

    get(x: number, y: number): GameObject | null {
        if (this.outOfBounds(x, y)) return null;
        
        return this.grid[x][y];
    }

    drawStaticGrid(): void {
        this.gridCanvasCtx.strokeStyle = "lightgrey";
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.gridCanvasCtx.strokeRect(i * this.cellSize, j * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    getAllWithTag(tag: string): GameObject[] | null {
        return this.objects.filter(obj => obj.CheckTag(tag));
    }

    removeFromArray(array: GameObject[], object: GameObject) {
        const index = array.indexOf(object);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }

    updateNeighborConnections(x: number, y: number, width: number = 1, height: number = 1) {
        const affected = new Set();

        for (let dx = -1; dx <= width; dx++) {
            for (let dy = -1; dy <= height; dy++) {
                const px = x + dx;
                const py = y + dy;

                if (this.outOfBounds(px, py)) continue;
                affected.add(`${px},${py}`);

                const neighbor = this.grid[px][py];
                if (neighbor instanceof GameObject && typeof neighbor.UpdateJoinDirections === "function") {
                    neighbor.UpdateJoinDirections();
                }
            }
        }

        for (const key of affected) {
            const [px, py] = String(key).split(",").map((part) => Number(part));
            const neighbor = this.grid[px][py];
            if (neighbor instanceof GameObject && typeof neighbor.getNeighborsPipes === "function") {
                for (const pipe of neighbor.getNeighborsPipes()) {
                    if (pipe instanceof GameObject && typeof pipe.UpdateJoinDirections === "function") {
                        pipe.UpdateJoinDirections();
                    }
                }
            }
        }
    }

    deleteGameObject(x: number, y: number) {
        if (this.outOfBounds(x, y)) return;
        let object = this.grid[x][y];
        if (object) {
            const affectedX = object.x;
            const affectedY = object.y;
            const affectedWidth = object.size.width;
            const affectedHeight = object.size.height;

            for (let dx = 0; dx < object.size.width; dx++){
                for (let dy = 0; dy < object.size.height; dy++){
                    if (!this.outOfBounds(object.x + dx, object.y + dy) && this.grid[object.x + dx][object.y + dy] === object) {
                        this.grid[object.x + dx][object.y + dy] = null;
                    }
                }
            }

            this.updateNeighborConnections(affectedX, affectedY, affectedWidth, affectedHeight);

            this.objects.splice(this.objects.indexOf(object), 1);
            this.removeFromArray(this.FluidMashines, object);
            this.removeFromArray(this.Pipes, object);
            this.removeFromArray(this.Belts, object);
            object.Delete();
        }
    }

    outOfBounds(x: number, y: number): boolean {
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
        let other = [];
        
        // Single pass to categorize objects
        for (let obj of this.objects) {
            if (obj.CheckTag("FluidMashine")) {
                fluidMashine.push(obj);
            } else if (obj instanceof Pipe) {
                pipes.push(obj);
            }
            else if (obj.CheckTag("BeltTile")) {
                belts.push(obj);
            }else {
                other.push(obj);
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
        
        for (let obj of other) {
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
            if(!(belt instanceof BeltTile)) continue;
            belt.DrawItem();
        }
    }
}
