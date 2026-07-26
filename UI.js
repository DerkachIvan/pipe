class Panel {
    constructor(ctx, x, y, width, height) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = "";
    }

    Draw(){
        this.ctx.save();
        this.ctx.fillStyle = "lightgrey";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "black";
        this.ctx.font = "10px Arial";
        this.ctx.fillText(this.text, this.x, this.y + this.height * 0.7);
        this.ctx.restore();
    }
}