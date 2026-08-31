class Chest extends GameObject {
    static sprites = {};

    constructor(ctx, x, y){
        super(ctx, x, y, 1, 1);
        this.SetTag("Chest");
        this.SetTag("HasInventory");

        this.inventory = new Inventory(10);

        this.inventory.TryInsert(Coal, 5)
    }

    static loadSprites() {
        const spriteName = "Chest"; // Assuming a single sprite for Furnace
        let img = new Image();
        img.src = `Storage/Chest/Sprites/${spriteName}.png`;
        Chest.sprites[spriteName] = img;
    }

    Draw(){
        this.ctx.save();
        let spriteKey = "Chest"; // Assuming a single sprite for Chest
        let sprite = Chest.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize * this.size.width, this.cellSize * this.size.height);
        }
        this.ctx.restore();
    }

    DrawInfo(ctx) {
        ctx.save();
        this.DrawInventory(ctx)
        ctx.restore();
    }
    
    DrawInventory(ctx){
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "lightgrey";
        this.inventory.Draw(ctx, this.rightBound, this.topBound);
        ctx.restore();;
    }
}