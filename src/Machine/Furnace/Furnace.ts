class Furnace extends CraftingMachine {
    static sprites = {};

    constructor(ctx, x, y){
        super(ctx, x, y, 2, 2, 2, 1); // Assuming 1 input slot and 1 output slot for Furnace
        this.SetTag("Furnace");

        this.machineType = "Furnace";
        this.SetRecipe(Recipes["IronBar"]); // Assuming the Furnace has a recipe for IronBar
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
    }

    DrawInfoHtml(container, offsetX, offsetY, scale){
        // Оба инвентаря печи находятся внутри одной экранной панели.
        const panel = document.createElement("div");
        panel.className = "inventory-panel";
        container.appendChild(panel);

        const inventoryContent = document.createElement("div");
        inventoryContent.className = "inventory-content";
        panel.appendChild(inventoryContent);

        this.input.DrawHtml(
            inventoryContent
        );
        this.output.DrawHtml(
            inventoryContent
        );
        this.CreateHtmlPreview(panel, "Machine/Furnace/Sprites/Furnace.png", "Furnace");
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
