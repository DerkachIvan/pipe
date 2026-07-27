class Drain extends GameObject {
    static sprites = {};

    constructor(ctx, x, y) {
        super(ctx, x, y);

        this.SetTag("Drain");
        this.SetTag("FluidMashine");

        this.capacity = 10;
        this.currentFill = 0;

        this.consumptionRate = 1;
        this.consumptionPerSecond = 2;

        this.joinDirections = {
            up: false,
            down: false,
            left: false,
            right: false
        };        
        console.log("Drain created at", x, y);
    }

    static loadSprites() {
        const spriteName = "drain"; // Assuming a single sprite for Drain
        let img = new Image();
        img.src = `pipes/${spriteName}.png`;
        Drain.sprites[spriteName] = img;
    }

    Update() {
        this.currentFill -= this.consumptionPerSecond * deltaTime * this.consumptionRate;
        if (this.currentFill < 0) {
            this.currentFill = 0;
        }

        this.getNeighbors().forEach(neighbor => {
            if (neighbor instanceof GameObject && neighbor.CheckTag("Pipe")) {
                neighbor.currentFill -= Math.min(neighbor.currentFill, this.consumptionPerSecond * deltaTime * this.consumptionRate);
                neighbor.isOutput = true;
            }
        });
    }

    Draw() {
        this.ctx.save();
        let spriteKey = "drain"; // Assuming a single sprite for Drain
        let sprite = Drain.sprites[spriteKey];
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
        ctx.fillText(`Drain`, this.rightBound + 5, this.topBound+10);
        ctx.fillText(`Fill: ${this.currentFill.toFixed(2)} / ${this.capacity}`, this.rightBound + 5, this.topBound + 25);
        ctx.restore();
    }
}