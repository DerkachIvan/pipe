"use strict";
class Loader extends GameObject {
    constructor(ctx, x, y, direction = "left") {
        super(ctx, x, y, 1, 1);
        this.SetTag("Loader");
        this.SetTag("BeltTile");
        this.item = null;
        this.direction = direction;
        this.nextObject;
        this.previousObject;
    }
    Update() {
        let nextDir = Loader.dirs[this.direction].output;
        let nextObj = map.get(this.x + nextDir.x, this.y + nextDir.y);
        if (nextObj?.CheckTag("HasInventory") || nextObj instanceof BeltTile) {
            this.nextObject = nextObj;
        }
        else {
            this.nextObject = null;
        }
        let previousDir = Loader.dirs[this.direction].input;
        let previousObj = map.get(this.x + previousDir.x, this.y + previousDir.y);
        if (previousObj?.CheckTag("HasInventory") || previousObj instanceof BeltTile) {
            this.previousObject = previousObj;
        }
        else {
            this.previousObject = null;
        }
        if (this.previousObject && this.nextObject) {
            let previousObjectItem;
            if (this.previousObject.HasItem()) {
                previousObjectItem = this.previousObject.item;
                if (previousObjectItem) {
                    if (this.nextObject.CanInsert(previousObjectItem, 1)) {
                        this.nextObject.LoaderTryInsert(previousObjectItem);
                        this.previousObject.LoaderTryGet();
                    }
                }
            }
        }
        //////////////////////////////////
        /*
        //console.log(this.previousObject)
        if(this.previousObject instanceof BeltTile && this.item == null){
            if(this.previousObject.item != null && this.previousObject.progress >= 1){
                this.item = this.previousObject.item;
                this.previousObject.progress = 0;
                this.previousObject.item = null;
            }
        } else if(this.previousObject?.CheckTag("HasOutput", "Storage") && this.item == null){
            let itemsGroups;
            if(this.previousObject?.CheckTag("HasOutput")){
                itemsGroups = this.previousObject.output.TryGet(1);
            }else{
                itemsGroups = this.previousObject.inventory.TryGet(1);
            }

            if(itemsGroups.totalAmount > 0){
                this.item = itemsGroups.items[0].item;
            }

        }

        if(this.nextObject?.CheckTag("HasInput", "Storage") && this.item != null){
            if(this.nextObject?.CheckTag("HasInput")){
                if(this.nextObject.input.TryInsert(this.item, 1)){
                    this.item = null
                }
            }else{
                if(this.nextObject.inventory.TryInsert(this.item, 1)){
                    this.item = null
                }
            }
        }else if(this.nextObject instanceof BeltTile){
            if(this.nextObject.TryInsert(this.item)){
                this.item = null
            }
        }*/
    }
    static loadSprites() {
        const spriteNames = [
            "U", "D", "L", "R"
        ];
        for (let name of spriteNames) {
            let img = new Image();
            img.src = `Belt/Loader/Sprites/loader${name}.png`;
            Loader.sprites[name] = img;
        }
    }
    getSpriteKey() {
        let key = "";
        if (this.direction === "up")
            return "U";
        if (this.direction === "down")
            return "D";
        if (this.direction === "left")
            return "L";
        if (this.direction === "right")
            return "R";
    }
    Draw() {
        this.ctx.save();
        // Draw sprite
        let spriteKey = this.getSpriteKey();
        let sprite = Loader.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize, this.cellSize);
        }
        this.ctx.restore();
    }
    Rotate() {
        if (this.direction === "up")
            this.direction = "right";
        else if (this.direction === "right")
            this.direction = "down";
        else if (this.direction === "down")
            this.direction = "left";
        else if (this.direction === "left")
            this.direction = "up";
    }
}
Loader.sprites = {};
Loader.dirs = {
    "up": {
        input: { x: 0, y: 1 },
        output: { x: 0, y: -1 }
    },
    "down": {
        input: { x: 0, y: -1 },
        output: { x: 0, y: 1 }
    },
    "left": {
        input: { x: 1, y: 0 },
        output: { x: -1, y: 0 }
    },
    "right": {
        input: { x: -1, y: 0 },
        output: { x: 1, y: 0 }
    },
};
//# sourceMappingURL=Loader.js.map