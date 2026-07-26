class Pipe extends GameObject{
    constructor(ctx, x, y) {
        super(ctx, x, y);

        this.SetTag("Pipe");

        this.capacity = 1;
        this.currentFill = 0;
        this.nextFill = 0;

        this.flowLevel = Infinity;

        this.isSource = false;
        this.isOutput = false;
        this.productionRate = 0.05;
        this.consumptionRate = 0.03;
    }

    Update(){
        if (this.isSource){
            this.currentFill = Math.min(this.capacity, this.currentFill + this.productionRate);
        }

        if (this.isOutput){
            this.currentFill = Math.max(0, this.currentFill - this.consumptionRate);
        }
    }

    Draw(){
        this.ctx.save();
        //outline
        if (this.isSource) {
            this.ctx.strokeStyle = "green";
        } else if (this.isOutput) {
            this.ctx.strokeStyle = "red";
        } else {
            this.ctx.strokeStyle = "grey";
        }

        //outline pipes
        this.ctx.strokeRect(
            this.leftBound, this.topBound,
            this.cellSize, this.cellSize
        );

        //fluid fill
        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(
            this.leftBound, this.topBound + lerpNumber(this.cellSize, 0, this.currentFill / this.capacity),
            this.cellSize, lerpNumber(0, this.cellSize, this.currentFill / this.capacity)
        );

        //goins//
        //top
        if(map.get(this.x, this.y - 1) instanceof Pipe){
            this.ctx.fillStyle = "gray";
            this.ctx.fillRect(
                this.leftBound + cellSize/2 - 2, this.topBound,
                4, 5,
            )
        }

        //bottom
        if(map.get(this.x, this.y + 1) instanceof Pipe){
            this.ctx.fillStyle = "gray";
            this.ctx.fillRect(
                this.leftBound + cellSize/2 - 2, this.bottomBound - 5,
                4, 5,
            )
        }

        //left
        if(map.get(this.x - 1, this.y) instanceof Pipe){
            this.ctx.fillStyle = "gray";
            this.ctx.fillRect(
                this.leftBound, this.topBound + cellSize/2 - 2,
                5, 4,
            )
        }
            
        //right
        if(map.get(this.x + 1, this.y) instanceof Pipe){
            this.ctx.fillStyle = "gray";
            this.ctx.fillRect(
                this.rightBound - 5, this.topBound + cellSize/2 - 2,
                5, 4,
            )
        }
            
        //label
        this.ctx.fillStyle = "black";
        this.ctx.font = "14px Arial";
        let label = this.flowLevel;
        if (this.isSource) label = "S";
        if (this.isOutput) label = "O";
        this.ctx.fillText(label, this.leftBound + 10, this.topBound + this.cellSize * 0.7);

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
