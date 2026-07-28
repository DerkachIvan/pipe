class FluidGenerator extends FluidMachine {
    static sprites = {};

    constructor(ctx, x, y, capacity = 10) {
        super(ctx, x, y, capacity);

        this.SetTag("FluidMashine");
        this.name = "FluidGenerator";

        this.fluidType = "water"; // Default fluid type
        this.productionRate = 1;
        this.productPerSecond = 1;

        this.joinDirections = {
            up: false,
            down: false,
            left: false,
            right: false
        };        
        console.log("FluidGenerator created at", x, y);
    }

    static loadSprites() {
        const spriteName = ["water", "oil"]; // Assuming two sprites for FluidGenerator
        
        for (let name of spriteName) {
            let img = new Image();
            img.src = `Fluid/FluidMachine/fluid generator ${name}.png`;
            FluidGenerator.sprites[name] = img;
        }
    }

    getSpriteKey() {
        let key = "";
        if (this.fluidType === "water") key += "water";
        if (this.fluidType === "oil") key += "oil";
        
        return key;
    }

    Update() {
        this.currentFill += this.productPerSecond * deltaTime * this.productionRate;
        if (this.currentFill > this.capacity) {
            this.currentFill = this.capacity;
        }

        this.getNeighbors().forEach(neighbor => {
            if (neighbor instanceof GameObject && neighbor.CheckTag("Pipe")) {
                if (neighbor.fluidType === null || neighbor.fluidType === this.fluidType) {
                    let neighborFreeSpace = neighbor.capacity - neighbor.currentFill;
                    let amountToTransfer = Math.min(this.currentFill, neighborFreeSpace);
                    this.currentFill -= amountToTransfer;
                    neighbor.currentFill += amountToTransfer;
                    neighbor.fluidType = this.fluidType;
                    neighbor.isSource = true;
                }
            }
        });
    }

    Draw() {
        this.ctx.save();
        let spriteKey = this.fluidType; // Assuming a single sprite for FluidGenerator
        let sprite = FluidGenerator.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize, this.cellSize);
        }

        if(DEBUG) {
            let fillHeight = lerpNumber(0, this.cellSize, this.currentFill / this.capacity);
            this.ctx.fillStyle = FLUID_TYPES[this.fluidType].color;
            this.ctx.fillRect(
                this.leftBound, 
                this.topBound + this.cellSize - fillHeight,
                this.cellSize, 
                fillHeight
            );
        }
        
        this.ctx.restore();
    }
}