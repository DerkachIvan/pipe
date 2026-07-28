class Pump extends FluidMachine {
    static sprites = {};
    
    constructor(ctx, x, y, direction) {
        super(ctx, x, y, 0); // Call the parent constructor with a default capacity of 10
        this.name = "Pump";
        this.SetTag("Pump");
        this.SetTag("FluidMashine");

        this.pumpDirection = direction;
        this.input = null;
        this.output = null;
        this.workRate = 0.15;
    }

    Update(){
        const directions = {
            "up": {input: {x: 0, y: 1}, output: {x: 0, y: -1}},
            "down": {input: {x: 0, y: -1}, output: {x: 0, y: 1}},
            "left": {input: {x: 1, y: 0}, output: {x: -1, y: 0}},
            "right": {input: {x: -1, y: 0}, output: {x: 1, y: 0}}
        };

        const dir = directions[this.pumpDirection];
        this.input = map.get(this.x + dir.input.x, this.y + dir.input.y);
        this.output = map.get(this.x + dir.output.x, this.y + dir.output.y);

        if(this.input instanceof Pipe){
            this.input.isOutput = true;
        }else if (this.input instanceof Pump){
            this.input = this.input.input;
        }


        if(this.output instanceof Pipe){
            this.output.isSource = true;
        }else if (this.output instanceof Pump){
            this.output = this.output.output;
        }


        if (
            this.input && this.output &&
            this.input.CheckTag(["Pipe", "FluidMashine"]) &&
            this.output.CheckTag(["Pipe", "FluidMashine"]) &&
            (this.input.fluidType === this.output.fluidType || this.output.fluidType === "empty")
        ) {
            if (this.output.fluidType === "empty") {
                this.output.fluidType = this.input.fluidType;
            }
            let outputFreeSpace = this.output.capacity - this.output.currentFill;
            let amountToTransfer = Math.min(this.workRate, this.input.currentFill, outputFreeSpace);

            this.input.currentFill -= amountToTransfer;
            this.output.currentFill += amountToTransfer;
        }
    }

    Rotate() {
        if (this.pumpDirection === "up") this.pumpDirection = "right";
        else if (this.pumpDirection === "right") this.pumpDirection = "down";
        else if (this.pumpDirection === "down") this.pumpDirection = "left";
        else if (this.pumpDirection === "left") this.pumpDirection = "up";
    }

    static loadSprites() {
        const spriteNames = [
            "U", "D", "L", "R"
        ];
        
        for (let name of spriteNames) {
            let img = new Image();
            img.src = `Fluid/pipes/pump sprites/pump ${name}.png`;
            Pump.sprites[name] = img;
        }
    }

    getSpriteKey() {
        let key = "";
        if (this.pumpDirection === "up") key += "U";
        if (this.pumpDirection === "down") key += "D";
        if (this.pumpDirection === "left") key += "L";
        if (this.pumpDirection === "right") key += "R";
        
        return key;
    }

    Draw(){
        this.ctx.save();
        
        let spriteKey = this.getSpriteKey();
        let sprite = Pump.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize, this.cellSize);
        }
        
        if (DEBUG) {
            this.ctx.strokeStyle = "orange";
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(this.leftBound, this.topBound, this.cellSize, this.cellSize);
            
            this.ctx.fillStyle = "black";
            this.ctx.font = "bold 12px Arial";
            this.ctx.fillText("P", this.leftBound + 5, this.topBound + 15);
        }
            
        this.ctx.restore();
    }

    DrawInfo(){

    }
}