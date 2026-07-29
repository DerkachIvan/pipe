class BeltItem{
    constructor(x, y, size = 10, color = "#0f0"){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    Draw(){
        ctx.save();
        
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size)
        
        ctx.restore();
    }
}