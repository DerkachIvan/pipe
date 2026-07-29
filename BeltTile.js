class BeltTile extends GameObject{
    static sprites = {};

    constructor(ctx, x, y, direction="left", speed=10){
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
    }
    
    dirs = {
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

    Update(){
        if(this.item){
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
            
        let nextDir = this.dirs[this.direction].output
        let nextObj = map.get(this.x + nextDir.x, this.y + nextDir.y);
        if(nextObj instanceof BeltTile){
                this.nextBeltTile = nextObj;
        } else{
            this.nextBeltTile = null
        }

        let previousDir = this.dirs[this.direction].input
        let previousObj = map.get(this.x + previousDir.x, this.y + previousDir.y);
        if(previousObj instanceof BeltTile){
                this.previousBeltTile = previousObj;
        } else{
            this.previousBeltTile = null;
        }
    
        let nextFree = this.nextBeltTile && !this.nextBeltTile.item;
        

        if(this.item && this.progress < 1){
            this.progress += this.speed * deltaTime;
        }
        if(this.progress > 1 && this.nextBeltTile?.TryInsert(this.item, this)){
            this.progress = 0;

            this.item = null;
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

        let dx = from.x - this.x;
        let dy = from.y - this.y;

        if(this.dirs[this.direction].input.x != dx ||
            this.dirs[this.direction].input.y != dy
        )
        this.progress = 0.5

        //console.log(`dx: ${dx}, dy: ${dy}`)


        this.item = item;

        return true;
    }

    Rotate(){
        if (this.direction === "up") this.direction = "right";
        else if (this.direction === "right") this.direction =  "down";
        else if (this.direction === "down") this.direction = "left";
        else if (this.direction === "left") this.direction =  "up";
    }
}