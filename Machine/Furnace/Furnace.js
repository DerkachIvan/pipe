class Furnace extends GameObject {
    static sprites = {};

    constructor(ctx, x, y){
        super(ctx, x, y);
        this.SetTag("Furnace");

        this.size = {width: 2, height: 2}
    }

    static loadSprites() {
        const spriteName = "furnace"; // Assuming a single sprite for Furnace
        let img = new Image();
        img.src = `Machine/Furnace/Sprites/${spriteName}.png`;
        Furnace.sprites[spriteName] = img;
    }

    Draw(){
        this.ctx.save();
        let spriteKey = "furnace"; // Assuming a single sprite for Furnace
        let sprite = Furnace.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize * this.size.width, this.cellSize * this.size.height);
        }
        this.ctx.restore();
    }

    DrawInfo(ctx) {
        ctx.save();
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(this.rightBound, this.topBound - 5, 110, 45);
        ctx.fillStyle = "black";
        ctx.font = "bold 12px Arial";
        ctx.fillText(`ID ${this.ID}`, this.rightBound + 5, this.topBound + 25);
        ctx.restore();
    }
}