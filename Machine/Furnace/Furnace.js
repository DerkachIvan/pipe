class Furnace extends GameObject {
    static sprites = {};

    constructor(ctx, x, y){
        super(ctx, x, y, 2, 2);
        this.SetTag("Furnace");
        this.SetTag("HasInventory");
        this.SetTag("HasInput");
        this.SetTag("HasOutput");

        this.machineType = "Furnace";

        this.input = new Inventory(2);
        this.input.slots[0].constItem = true;
        this.input.slots[0].item = Coal;

        this.output = new Inventory(1);
        
        this.input.TryInsert(Coal, 5)
    }

    CanCraft(){
        
    }

    static loadSprites() {
        const spriteName = "Furnace"; // Assuming a single sprite for Furnace
        let img = new Image();
        img.src = `Machine/Furnace/Sprites/${spriteName}.png`;
        Furnace.sprites[spriteName] = img;
    }

    Draw(){
        this.ctx.save();
        let spriteKey = "Furnace"; // Assuming a single sprite for Furnace
        let sprite = Furnace.sprites[spriteKey];
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
        this.input.Draw(ctx, this.rightBound, this.topBound);
        this.output.Draw(ctx, this.rightBound, this.topBound + 20);
        ctx.restore();
    }
}