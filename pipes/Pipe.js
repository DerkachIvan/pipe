class Pipe extends GameObject{
    static sprites = {};

    constructor(ctx, x, y) {
        super(ctx, x, y);

        this.SetTag("Pipe");

        this.capacity = 5;
        this.currentFill = 0;
        this.nextFill = 0;

        this.flowLevel = Infinity;

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
            img.src = `pipes/pipe sprites/pipe ${name}.png`;
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

    Update(){
        this.isOutput = false;
        this.isSource = false;

        this.joinDirections.up = map.get(this.x, this.y - 1) instanceof GameObject &&
            map.get(this.x, this.y - 1).CheckTag(["Pipe", "Pump", "FluidMashine"]);
        this.joinDirections.down = map.get(this.x, this.y + 1) instanceof GameObject &&
            map.get(this.x, this.y + 1).CheckTag(["Pipe", "Pump", "FluidMashine"]);
        this.joinDirections.left = map.get(this.x - 1, this.y) instanceof GameObject &&
            map.get(this.x - 1, this.y).CheckTag(["Pipe", "Pump", "FluidMashine"]);
        this.joinDirections.right = map.get(this.x + 1, this.y) instanceof GameObject && 
            map.get(this.x + 1, this.y).CheckTag(["Pipe", "Pump", "FluidMashine"]);
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
            this.ctx.fillStyle = "rgba(0, 100, 255, 0.4)";
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
        ctx.fillRect(this.rightBound, this.topBound - 5, 100, 40);
        ctx.fillStyle = "black";
        ctx.font = "bold 12px Arial";
        ctx.fillText(`Pipe`, this.rightBound + 5, this.topBound+10);
        ctx.fillText(`Fill: ${this.currentFill.toFixed(2)} / ${this.capacity}`, this.rightBound + 5, this.topBound + 25);
        ctx.restore();
    }

    
}
