class FluidMachine extends GameObject {
    static sprites = {};

    constructor(ctx, x, y, capacity) {
        super(ctx, x, y);
        this.name = "FluidMachine";
        this.SetTag("FluidMashine");
        this.capacity = capacity;
        this.currentFill = 0;
        this.fluidType = "water"; // Default fluid type
        this.joinDirections = {
            up: false,
            down: false,
            left: false,
            right: false
        };
    }

    DrawInfo(ctx) {
        ctx.save();
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(this.rightBound, this.topBound - 5, 110, 45);
        ctx.fillStyle = "black";
        ctx.font = "bold 12px Arial";
        ctx.fillText(`${this.name}:`, this.rightBound + 5, this.topBound+10);
        ctx.fillText(`Fill ${this.fluidType}: ${this.currentFill.toFixed(2)} / ${this.capacity}`, this.rightBound + 5, this.topBound + 25);
        
        ctx.fillStyle = FLUID_TYPES[this.fluidType].color;
        ctx.fillRect(this.rightBound + 5, this.topBound + 30, lerpNumber(0, 100, this.currentFill / this.capacity), 5);
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.rightBound + 5, this.topBound + 30, 100, 5);
        ctx.restore();
        ctx.restore();
    }
}