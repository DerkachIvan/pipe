class Pipe extends GameObject{
    static sprites = {};

    constructor(ctx, x, y) {
        super(ctx, x, y);

        this.SetTag("Pipe");

        this.capacity = 5;
        this.fluid = new Fluid("empty", 0);
        this.hasFluid = false;
        Object.defineProperty(this, "fluidType", {
            get: () => this.fluid.type,
            set: (value) => { this.fluid.type = value; }
        });
        Object.defineProperty(this, "currentFill", {
            get: () => this.fluid.quantity,
            set: (value) => { this.fluid.quantity = value; }
        });
        this.currentFill = 0;
        this.nextFill = 0;

        this.flowLevel = Infinity;
        this.thresholdFluidTypeReset = 0.0001; // Threshold for resetting fluid type when currentFill is low

        this.isSource = false;
        this.isOutput = false;
        this.consumptionRate = 0;

        this.joinDirections = {
            up: false,
            down: false,
            left: false,
            right: false
        };
    }

    static loadSprites() {
        const spriteNames = [
            "H", "V", "UL", "UR", "DL", "DR",
            "ULR", "UDL", "UDR", "DLR", "cross"
        ];
        
        for (let name of spriteNames) {
            let img = new Image();
            img.src = `Fluid/pipes/pipe sprites/pipe ${name}.png`;
            Pipe.sprites[name] = img;
        }
    }

    getSpriteKey() {
        let key = "";
        if (this.joinDirections.up) key += "U";
        if (this.joinDirections.down) key += "D";
        if (this.joinDirections.left) key += "L";
        if (this.joinDirections.right) key += "R";
        
        if (key === "U" || key === "D") return "V";
        if (key === "L" || key === "R") return "H";


        if (key === "") return "H";
        if (key === "UD") return "V";
        if (key === "LR") return "H";
        if (key === "UDLR") return "cross";
        
        return key;
    }

    UpdateJoinDirections() {
        const canConnect = (x, y) => {
            const neighbor = map.get(x, y);
            return neighbor instanceof GameObject && neighbor.CheckTag(["Pipe", "Pump", "FluidMashine"]);
        };

        this.joinDirections.up = canConnect(this.x, this.y - 1);
        this.joinDirections.down = canConnect(this.x, this.y + 1);
        this.joinDirections.left = canConnect(this.x - 1, this.y);
        this.joinDirections.right = canConnect(this.x + 1, this.y);
    }

    Update(){
        this.isOutput = false;
        this.isSource = false;

        if (this.currentFill <= this.thresholdFluidTypeReset) {
            this.currentFill = 0;
            this.fluidType = "empty";
            this.hasFluid = false;
        }

        
    }

    Delete(){
        this.getNeighborsPipes().forEach(neighbor => {
            neighbor.UpdateJoinDirections();
        })
    }

    Draw(){
        this.ctx.save();
        
        // Draw sprite
        let spriteKey = this.getSpriteKey();
        let sprite = Pipe.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize, this.cellSize);
        }

        if(DEBUG) {
            // Draw outline based on type
            if (this.isSource) {
                this.ctx.strokeStyle = "lime";
                this.ctx.lineWidth = 3;
            } else if (this.isOutput) {
                this.ctx.strokeStyle = "red";
                this.ctx.lineWidth = 3;
            } else {
                this.ctx.strokeStyle = "rgba(128, 128, 128, 0.5)";
                this.ctx.lineWidth = 1;
            }
            this.ctx.strokeRect(this.leftBound, this.topBound, this.cellSize, this.cellSize);
            
            // Draw fluid fill overlay
            let fillHeight = lerpNumber(0, this.cellSize, this.currentFill / this.capacity);
            this.ctx.fillStyle = FLUID_TYPES[this.fluidType].color;
            this.ctx.fillRect(
                this.leftBound, 
                this.topBound + this.cellSize - fillHeight,
                this.cellSize, 
                fillHeight
            );

            // Draw label
            this.ctx.fillStyle = "black";
            this.ctx.font = "bold 12px Arial";
            let label = Math.floor(this.flowLevel);
            if (this.isSource) label = "S";
            if (this.isOutput) label = "O";
            if (this.isPump) label = "P";
            this.ctx.fillText(label, this.leftBound + 5, this.topBound + 15);
        }
        

        this.ctx.restore();
    }

    getNeighborsPipes(){
        const dirs = [
            {x: 0, y: -1},
            {x: 0, y: 1},
            {x: -1, y: 0},
            {x: 1, y: 0},
        ];

        let result = []

        for(let d of dirs){
            let n = map.get(this.x + d.x, this.y + d.y);
            if (n instanceof Pipe){
                result.push(n);
            }
        }
        return result;
    }

    DrawInfo(ctx) {
        ctx.save();
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(this.rightBound, this.topBound - 5, 110, 45);
        ctx.fillStyle = "black";
        ctx.font = "bold 12px Arial";
        ctx.fillText(`Pipe`, this.rightBound + 5, this.topBound+10);
        ctx.fillText(`Fill ${this.fluidType}: ${this.currentFill.toFixed(2)} / ${this.capacity}`, this.rightBound + 5, this.topBound + 25);

        ctx.fillStyle = FLUID_TYPES[this.fluidType].color;
        ctx.fillRect(this.rightBound + 5, this.topBound + 30, lerpNumber(0, 100, this.currentFill / this.capacity), 5);
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.rightBound + 5, this.topBound + 30, 100, 5);
        ctx.restore();
    }

    
}
