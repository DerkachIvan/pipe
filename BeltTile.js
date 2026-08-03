class BeltTile extends GameObject{
    static sprites = {};

    constructor(ctx, x, y, direction="left", speed=1){
        super(ctx, x, y);
        this.SetTag("BeltTile");

        this.speed = speed;
        this.direction = direction;

        this.nextBeltTile;
        this.previousBeltTile;

        this.item = null;
        this.progress = 0;
        this.itemStartPoint = {x: 0, y: 0};
        this.itemEndPoint = {x: 0, y: 0};

        this.setItemStartEndPoint();
    }
    
    static dirs = {
        "up": {
            input: {x: 0, y: 1},
            output: {x: 0, y: -1}
        },
        "down": {
            input: {x: 0, y: -1},
            output: {x: 0, y: 1}
        },
        "left": {
            input: {x: 1, y: 0},
            output: {x: -1, y: 0}
        },
        "right": {
            input: {x: -1, y: 0},
            output: {x: 1, y: 0}
        },
    };

    setItemStartEndPoint(){
        console.log('alo')
        if(this.direction === "up"){
            this.itemStartPoint.x = this.leftBound + this.cellSize/2;
            this.itemStartPoint.y = this.bottomBound;
            
            this.itemEndPoint.x = this.leftBound + this.cellSize/2;
            this.itemEndPoint.y = this.topBound;
        }else if(this.direction === "down"){
            this.itemStartPoint.x = this.leftBound + this.cellSize/2;
            this.itemStartPoint.y = this.topBound;
            
            this.itemEndPoint.x = this.leftBound + this.cellSize/2;
            this.itemEndPoint.y = this.bottomBound;
        }else if(this.direction === "left"){
            this.itemStartPoint.x = this.rightBound;
            this.itemStartPoint.y = this.topBound + this.cellSize/2;
            
            this.itemEndPoint.x = this.leftBound;
            this.itemEndPoint.y = this.topBound + this.cellSize/2;
        }else if(this.direction === "right"){
            this.itemStartPoint.x = this.leftBound;
            this.itemStartPoint.y = this.topBound + this.cellSize/2;
            
            this.itemEndPoint.x = this.rightBound;
            this.itemEndPoint.y = this.topBound + this.cellSize/2;
        }
    }

    Update(){        
        let nextDir = BeltTile.dirs[this.direction].output
        let nextObj = map.get(this.x + nextDir.x, this.y + nextDir.y);
        if(nextObj instanceof BeltTile){
                this.nextBeltTile = nextObj;
        } else{
            this.nextBeltTile = null
        }

        let previousDir = BeltTile.dirs[this.direction].input
        let previousObj = map.get(this.x + previousDir.x, this.y + previousDir.y);
        if(previousObj instanceof BeltTile){
                this.previousBeltTile = previousObj;
        } else{
            this.previousBeltTile = null;
        }
    
        let nextFree = this.nextBeltTile && !this.nextBeltTile.item;
        
        if (this.item) {
            if (this.progress < 1) {
                this.progress += this.speed * deltaTime;
                if (this.progress > 1) {
                    this.progress = 1;
                }
            }

            if (this.progress >= 1) {
                this.attemptTransfer(new Set());
            }
        }
    }
    
    attemptTransfer(visited) {
        if (!this.item || this.progress < 1) {
            return false;
        }

        if (!this.nextBeltTile) {
            return false;
        }

        if(
            BeltTile.dirs[this.nextBeltTile.direction].input.x === BeltTile.dirs[this.direction].output.x &&
            BeltTile.dirs[this.nextBeltTile.direction].input.y === BeltTile.dirs[this.direction].output.y
        ) {
            return false;
        }

        if (visited.has(this)) {
            return false;
        }

        visited.add(this);

        if (!this.nextBeltTile.item) {
            this.nextBeltTile.item = this.item;
            this.nextBeltTile.progress = 0;
            this.item = null;
            this.progress = 0;
            visited.delete(this);
            return true;
        }

        if (this.nextBeltTile.attemptTransfer(visited)) {
            if (this.item) {
                this.nextBeltTile.item = this.item;
                this.nextBeltTile.progress = 0;
                this.item = null;
                this.progress = 0;
            }
            visited.delete(this);
            return true;
        }

        visited.delete(this);
        return false;
    }
    
    static loadSprites() {
        const spriteNames = [
            "U", "D", "L", "R", "UL", "UR",
            "DL", "DR"
        ];
        
        for (let name of spriteNames) {
            let img = new Image();
            img.src = `Belt/Sprites/Belt ${name}.png`;
            BeltTile.sprites[name] = img;
        }
    }

    getSpriteKey() {
        let key = "";
        if (this.direction === "up") return "U";
        if (this.direction === "down") return "D";
        if (this.direction === "left") return "L";
        if (this.direction === "right") return "R";

    }

    Draw(){
        this.ctx.save();
        
        // Draw sprite
        let spriteKey = this.getSpriteKey();
        let sprite = BeltTile.sprites[spriteKey];
        if (sprite && sprite.complete) {
            this.ctx.drawImage(sprite, this.leftBound, this.topBound, this.cellSize, this.cellSize);
        }

        if(this.item){
            /*this.ctx.fillStyle = "#0f0";

            
            this.ctx.fillRect(itemX, itemY, this.itemSize, this.itemSize)*/
            
            let itemX = lerpNumber(this.itemStartPoint.x, this.itemEndPoint.x, this.progress) 
            let itemY = lerpNumber(this.itemStartPoint.y, this.itemEndPoint.y, this.progress) 
            this.item.x = itemX;
            this.item.y = itemY;
        }

        if(DEBUG){
            this.ctx.fillStyle = "#00c3ff";
            this.ctx.fillRect(this.itemStartPoint.x, this.itemStartPoint.y, 10, 10);

        }

        this.ctx.restore();
    }

    DrawItem(){
        this.item?.Draw();
    }

    TryInsert(item, from)
    {
        if(this.item)
            return false;

        this.item = item;
        this.progress = 0;
        return true;
    }

    Rotate(){
        if (this.direction === "up") this.direction = "right";
        else if (this.direction === "right") this.direction =  "down";
        else if (this.direction === "down") this.direction = "left";
        else if (this.direction === "left") this.direction =  "up";

        this.setItemStartEndPoint()
    }
}