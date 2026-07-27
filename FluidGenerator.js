class FluidGenerator extends GameObject {
    static sprites = {};

    constructor(ctx, x, y) {
        super(ctx, x, y);

        this.SetTag("FluidGenerator");
        this.SetTag("FluidMashine");

        this.capacity = 10;
        this.currentFill = 0;

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
        const spriteName = "fluid generator"; // Assuming a single sprite for FluidGenerator
        let img = new Image();
        img.src = `pipes/${spriteName}.png`;
        FluidGenerator.sprites[spriteName] = img;
    }

    Update() {
        this.currentFill += this.productPerSecond * deltaTime * this.productionRate;
        if (this.currentFill > this.capacity) {
            this.currentFill = this.capacity;
        }

        this.getNeighbors().forEach(neighbor => {
            if (neighbor instanceof GameObject && neighbor.CheckTag("Pipe")) {
                let neighborFreeSpace = neighbor.capacity - neighbor.currentFill;
                let amountToTransfer = Math.min(this.currentFill, neighborFreeSpace);
                this.currentFill -= amountToTransfer;
                neighbor.currentFill += amountToTransfer;
                neighbor.isSource = true;
            }
        });
    }

    Draw() {
        this.ctx.save();
        let spriteKey = "fluid generator"; // Assuming a single sprite for FluidGenerator
        let sprite = FluidGenerator.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize, this.cellSize);
        }

        if(DEBUG) {
            let fillHeight = lerpNumber(0, this.cellSize, this.currentFill / this.capacity);
            this.ctx.fillStyle = "rgba(0, 100, 255, 0.4)";
            this.ctx.fillRect(
                this.leftBound, 
                this.topBound + this.cellSize - fillHeight,
                this.cellSize, 
                fillHeight
            );
        }
        
        this.ctx.restore();
    }

    DrawInfo(ctx) {
        ctx.save();
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(this.rightBound, this.topBound - 5, 100, 40);
        ctx.fillStyle = "black";
        ctx.font = "bold 12px Arial";
        ctx.fillText(`Fluid Generator`, this.rightBound + 5, this.topBound+10);
        ctx.fillText(`Fill: ${this.currentFill.toFixed(2)} / ${this.capacity}`, this.rightBound + 5, this.topBound + 25);
        ctx.restore();
    }
}