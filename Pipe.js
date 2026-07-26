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
    }

    Draw(){
        this.ctx.save();
        //outline
        this.ctx.strokeStyle = "grey";
        this.ctx.strokeRect(
            this.leftBound + this.cellSize*0.2, this.topBound,
            this.cellSize*0.6, this.cellSize
        );

        this.ctx.fillStyle = "blue";
        this.ctx.fillRect(
            this.leftBound + this.cellSize*0.2, this.topBound + lerpNumber(this.cellSize, 0, this.currentFill / this.capacity),
            this.cellSize*0.6, lerpNumber(0, this.cellSize, this.currentFill / this.capacity)
        );

        this.ctx.fillStyle = "black";
        this.ctx.font = "14px Arial";
        this.ctx.fillText(this.flowLevel, this.leftBound + 10, this.topBound + this.cellSize * 0.7);

        this.ctx.restore();
    }

    getNeighbors(map){
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
