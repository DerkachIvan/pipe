class GameObject {
    texture = null;
    cellSize = 30;
    selected = false;
    tag = ["GameObject"];
    ID = -1;
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.leftBound = x * this.cellSize;
        this.rightBound = (x + 1) * this.cellSize;
        this.topBound = y * this.cellSize;
        this.bottomBound = (y + 1) * this.cellSize;
    }

    GetID(){
        return this.ID;
    }

    SetTag(tag){
        this.tag.push(tag);
    }

    CheckTag(tag){
        return this.tag.includes(tag);
    }

    Start(){

    }

    Update(){

    }

    Draw() {

    }
}