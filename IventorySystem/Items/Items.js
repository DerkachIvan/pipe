class Item {
    static sprites = [];
    constructor(name = "None", type = "None", maxStackSize = 100) {
        this.name = name;
        this.type = type;
        this.maxStackSize = maxStackSize;
    }

    static loadSprites() {
        const spriteNames = [
            "CompressedOil", "None"
        ];

        for (let name of spriteNames){
            let img = new Image();
            img.src = `IventorySystem/Items/Sprites/${name}.png`;
            Item.sprites[name] = img;
        }
    }

    Draw(x, y, size) {
        ctx.save();
        let sprite = Item.sprites[this.name];
        if (sprite && sprite.complete) {
            ctx.drawImage(sprite, x - size/2, y - size/2, size, size);
        }
        ctx.restore();
    }
}