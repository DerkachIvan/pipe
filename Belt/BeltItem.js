class BeltItem{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 10;
    }

    Draw(){
        ctx.save();
        
        ctx.fillStyle = "#0f0";
        ctx.fillRect(this.x, this.y, this.size, this.size)
        
        ctx.restore();
    }
}