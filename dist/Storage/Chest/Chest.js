"use strict";
class Chest extends GameObject {
    constructor(ctx, x, y) {
        super(ctx, x, y, 1, 1);
        this.SetTag("Chest");
        this.SetTag("HasInventory");
        this.SetTag("Storage");
        this.inventory = new Inventory(32);
        this.inventory.TryInsert(Coal, 5);
    }
    get item() {
        for (let slot of this.inventory.slots) {
            if (slot.item && slot.amount != 0) {
                return slot.item;
            }
        }
        return null;
    }
    HasItem() {
        return this.inventory.HasItem();
    }
    LoaderTryGet() {
        return this.inventory.TryGet(null, 1);
    }
    LoaderTryInsert(item) {
        this.inventory.TryInsert(item, 1);
    }
    CanInsert(item, amount) {
        return this.inventory.CanInsert(item, amount);
    }
    static loadSprites() {
        const spriteName = "Chest"; // Assuming a single sprite for Furnace
        let img = new Image();
        img.src = `Storage/Chest/Sprites/${spriteName}.png`;
        Chest.sprites[spriteName] = img;
    }
    Draw() {
        this.ctx.save();
        let spriteKey = "Chest"; // Assuming a single sprite for Chest
        let sprite = Chest.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize * this.size.width, this.cellSize * this.size.height);
        }
        this.ctx.restore();
    }
    DrawInfo(ctx) {
    }
    DrawInfoHtml(container, offsetX, offsetY, scale) {
        // Инвентарь сундука выводится в центр экрана поверх canvas.
        const panel = document.createElement("div");
        panel.className = "inventory-panel";
        container.appendChild(panel);
        const inventoryContent = document.createElement("div");
        inventoryContent.className = "inventory-content";
        panel.appendChild(inventoryContent);
        this.inventory.DrawHtml(inventoryContent);
        this.CreateHtmlPreview(panel, "Storage/Chest/Sprites/Chest.png", "Chest");
    }
    DrawInventory(ctx) {
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "lightgrey";
        this.inventory.Draw(ctx, this.rightBound, this.topBound);
        ctx.restore();
        ;
    }
}
Chest.sprites = {};
//# sourceMappingURL=Chest.js.map