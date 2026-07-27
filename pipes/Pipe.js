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
        this.productionRate = 0.05;
        this.consumptionRate = 0.03;

        this.joinDirections = {
            up: false,
            down: false,
            left: false,
            right: false
        };
    }

    static loadSprites() {
        const spriteNames = [
            "H", "V", "TL", "TR", "BL", "BR",
            "TLR", "TBL", "TBR", "BLR", "cross"
        ];
        
        for (let name of spriteNames) {
            let img = new Image();
            img.src = `pipes/sprites/pipe ${name}.png`;
            Pipe.sprites[name] = img;
        }
    }

    getSpriteKey() {
        let key = "";
        if (this.joinDirections.up) key += "T";
        if (this.joinDirections.down) key += "B";
        if (this.joinDirections.left) key += "L";
        if (this.joinDirections.right) key += "R";
        
        if (key === "T" || key === "B") return "V";
        if (key === "L" || key === "R") return "H";


        if (key === "") return "H";
        if (key === "TB") return "V";
        if (key === "LR") return "H";
        if (key === "TBLR") return "cross";
        
        return key;
    }

    Update(){
        if (this.isSource){
            this.currentFill = Math.min(this.capacity, this.currentFill + this.productionRate);
        }

        if (this.isOutput){
            this.currentFill = Math.max(0, this.currentFill - this.consumptionRate);
        }

        this.joinDirections.up = map.get(this.x, this.y - 1) instanceof Pipe;
        this.joinDirections.down = map.get(this.x, this.y + 1) instanceof Pipe;
        this.joinDirections.left = map.get(this.x - 1, this.y) instanceof Pipe;
        this.joinDirections.right = map.get(this.x + 1, this.y) instanceof Pipe;
    }

    Draw(){
        this.ctx.save();
        
        // Draw sprite
        let spriteKey = this.getSpriteKey();
        let sprite = Pipe.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize, this.cellSize);
        }
        
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
        this.ctx.fillText(label, this.leftBound + 5, this.topBound + 15);

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

    consume(ammount){
        let used = Math.min(this.currentFill, ammount);
        this.currentFill -= used;
        return used;
    }

    
}
