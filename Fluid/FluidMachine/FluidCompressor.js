class FluidCompressor extends FluidMachine {
    static sprites = {};

    constructor(ctx, x, y, capacity = 20) {
        super(ctx, x, y, capacity);
        this.name = "FluidCompressor";
        this.SetTag("FluidCompressor");

        this.isWork = false;

        this.fluidType = "oil";
        this.productType = "compressedOil";
        this.amountOfProduct = 0; // Amount of product produced by the compressor

        this.fluidTransferRate = 4; // Rate at which fluid is transferred to the compressor
        this.amountFluidTransferPerSecond = 1; // Amount of fluid transferred per second

        this.amountToCompress = 2; // Amount of fluid to compress per update
        this.workRate = 1; // Rate at which the compressor works
        this.workProgress = 0; // Progress of the current compression cycle
        this.curentWorkTime = 0; // Current time spent on the compression cycle
        this.timeForWork = 5; // Time required to complete one compression cycle
    }

    static loadSprites() {
        const spriteName = "fluid compressor"; // Assuming a single sprite for FluidCompressor
        let img = new Image();
        img.src = `Fluid/FluidMachine/${spriteName}.png`;
        FluidCompressor.sprites[spriteName] = img;
    }

    Update(){
        this.getNeighbors().forEach(neighbor => {
            if (neighbor instanceof GameObject && neighbor.CheckTag("Pipe")) {
                if (neighbor.fluidType === this.fluidType){
                    let freeSpace = this.capacity - this.currentFill;
                    let transferPerUpdate = this.amountFluidTransferPerSecond * this.fluidTransferRate * deltaTime;
                    
                    let amountToTransfer = Math.min(transferPerUpdate, neighbor.currentFill, freeSpace);
                    
                    neighbor.currentFill -= amountToTransfer;
                    this.currentFill += amountToTransfer;
                }
            }
        });
        
        this.isWork = this.workProgress > 0;

        if(this.currentFill >= this.amountToCompress) {
            this.curentWorkTime += this.workRate * deltaTime;
            
            if(this.curentWorkTime >= this.timeForWork) {
                this.currentFill -= this.amountToCompress;
                this.amountOfProduct += 1;
                this.curentWorkTime = 0; // Reset work time
            }
        }

        this.workProgress = this.curentWorkTime / this.timeForWork;
    }

    Draw(){
        this.ctx.save();

        let spriteKey = "fluid compressor";
        let sprite = FluidCompressor.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize, this.cellSize);
        } 

        if(this.isWork){
            this.ctx.fillStyle = "rgb(12, 231, 30)"
        }else{
            this.ctx.fillStyle = "rgb(231, 45, 12)"
        }

        this.ctx.fillRect(this.leftBound + cellSize/2 - 5, this.topBound + cellSize/2 - 5, 10, 10)
 
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

    DrawInfo(ctx) {
        ctx.save();
        
        //panel
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(this.rightBound, this.topBound - 5, 110, 85);
        
        //text
        ctx.fillStyle = "black";
        ctx.font = "bold 12px Arial";
        ctx.fillText(`${this.name}:`, this.rightBound + 5, this.topBound+10);
        ctx.fillText(`Fill ${this.fluidType}: ${this.currentFill.toFixed(2)} / ${this.capacity}`, this.rightBound + 5, this.topBound + 25);
        
        //fill progress bar
        ctx.fillStyle = FLUID_TYPES[this.fluidType].color;
        ctx.fillRect(this.rightBound + 5, this.topBound + 30, lerpNumber(0, 100, this.currentFill / this.capacity), 5);
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.rightBound + 5, this.topBound + 30, 100, 5);
        
        //text
        ctx.fillStyle = "black";
        ctx.font = "bold 12px Arial";
        ctx.fillText(`Work progress: ${this.curentWorkTime.toFixed(2)} / ${this.timeForWork}`, this.rightBound + 5, this.topBound + 50);
        ctx.fillText(`${this.productType}: ${this.amountOfProduct}`, this.rightBound + 5, this.topBound + 65);
        
        //work progress bar
        ctx.fillStyle = "rgb(76, 163, 26)";
        ctx.fillRect(this.rightBound + 5, this.topBound + 70, lerpNumber(0, 100, this.workProgress), 5);
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.rightBound + 5, this.topBound + 70, 100, 5);
        
        ctx.restore();
    }
}