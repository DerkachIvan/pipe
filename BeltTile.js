class BeltTile extends GameObject{
    static sprites = {};

    constructor(ctx, x, y, direction="left", speed=1){
        super(ctx, x, y);
        this.SetTag("BeltTile");

        this.speed = speed;
        this.direction = direction;

        this.nextBeltTile;
        this.previousBeltTile;

        this.hesItem = false;
        this.progress = 0;
        this.itemStartPoint = {x: 0, y: 0};
        this.itemEndPoint = {x: 0, y: 0};
    }
    
    dirs = {
        "up": {x: 0, y: -1},
        "down": {x: 0, y: 1},
        "left": {x: -1, y: 0},
        "right": {x: 1, y: 0},
    };

    itemSize = 10;
    Update(){

        
        if(this.direction === "up"){
            this.itemStartPoint.x = this.leftBound + this.cellSize/2 - this.itemSize/2;
            this.itemStartPoint.y = this.bottomBound - this.itemSize;

            this.itemEndPoint.x = this.leftBound + this.cellSize/2 - this.itemSize/2;
            this.itemEndPoint.y = this.topBound;
        }else if(this.direction === "down"){
            this.itemStartPoint.x = this.leftBound + this.cellSize/2 - this.itemSize/2;
            this.itemStartPoint.y = this.topBound;

            this.itemEndPoint.x = this.leftBound + this.cellSize/2 - this.itemSize/2;
            this.itemEndPoint.y = this.bottomBound - this.itemSize;
        }else if(this.direction === "left"){
            this.itemStartPoint.x = this.rightBound - this.itemSize;
            this.itemStartPoint.y = this.topBound + this.cellSize/2 - this.itemSize/2;

            this.itemEndPoint.x = this.leftBound;
            this.itemEndPoint.y = this.topBound + this.cellSize/2 - this.itemSize/2;
        }else if(this.direction === "right"){
            this.itemStartPoint.x = this.leftBound;
            this.itemStartPoint.y = this.topBound + this.cellSize/2 - this.itemSize/2;

            this.itemEndPoint.x = this.rightBound - this.itemSize;
            this.itemEndPoint.y = this.topBound + this.cellSize/2 - this.itemSize/2;
        }


        if (this.direction === "up") {
            let nextObj = map.get(this.x, this.y-1);
            if(nextObj instanceof BeltTile){
                this.nextBeltTile = nextObj;
            }

            let previousObj = map.get(this.x, this.y+1);
            if(previousObj instanceof BeltTile){
                this.previousBeltTile = previousObj;
            }
        }
        if (this.direction === "down") {
            let nextObj = map.get(this.x, this.y+1);
            if(nextObj instanceof BeltTile){
                this.nextBeltTile = nextObj;
            }
    
            let previousObj = map.get(this.x, this.y-1);
            if(previousObj instanceof BeltTile){
                this.previousBeltTile = previousObj;
            }
        }
        if (this.direction === "left") {
            let nextObj = map.get(this.x-1, this.y);
            if(nextObj instanceof BeltTile){
                this.nextBeltTile = nextObj;
            }
    
            let previousObj = map.get(this.x+1, this.y);
            if(previousObj instanceof BeltTile){
                this.previousBeltTile = previousObj;
            }
        }
        if (this.direction === "right") {
            let nextObj = map.get(this.x+1, this.y);
            if(nextObj instanceof BeltTile){
                this.nextBeltTile = nextObj;
            }
        
            let previousObj = map.get(this.x-1, this.y);
            if(previousObj instanceof BeltTile){
                this.previousBeltTile = previousObj;
            }
        }
    
        let nextFree = this.nextBeltTile && !this.nextBeltTile.hesItem;
        

        if(this.hesItem && this.progress < 1){
            this.progress += this.speed * deltaTime;
        }
        if(this.progress > 1 && nextFree){
            this.progress = 0;
            this.hesItem = false;

            this.nextBeltTile.hesItem = true;
        }
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

        if(this.hesItem){
            this.ctx.fillStyle = "#0f0";

            let itemX = lerpNumber(this.itemStartPoint.x, this.itemEndPoint.x, this.progress) 
            let itemY = lerpNumber(this.itemStartPoint.y, this.itemEndPoint.y, this.progress) 
            
            this.ctx.fillRect(itemX, itemY, this.itemSize, this.itemSize)
        }

        this.ctx.restore();
    }

    Rotate(){
        if (this.direction === "up") this.direction = "right";
        else if (this.direction === "right") this.direction =  "down";
        else if (this.direction === "down") this.direction = "left";
        else if (this.direction === "left") this.direction =  "up";
    }
}