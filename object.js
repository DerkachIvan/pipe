class GameObject {
    static SELECTED_OBJECT = null;
    texture = null;
    cellSize = 30;
    selected = false;
    tag = ["GameObject"];
    ID = -1;
    selected = false;
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

    static DrawSelectedObjectInfo(ctx) {
        if (GameObject.SELECTED_OBJECT instanceof GameObject) {
            GameObject.SELECTED_OBJECT?.DrawInfo(ctx);
            GameObject.SELECTED_OBJECT.selected = true;
        }
    }

    SetTag(tag){
        this.tag.push(tag);
    }

    CheckTag(tag){
        if (typeof tag === "string") return this.tag.includes(tag);
        if (Array.isArray(tag)) return tag.some(t => this.tag.includes(t));
    }

    Rotate(){

    }

    Start(){

    }

    Update(){

    }

    Draw() {

    }

    static loadSprites(){

    }

    DrawInfo(ctx) {
        
    }

    getNeighbors(){
        const dirs = [
            {x: 0, y: -1},
            {x: 0, y: 1},
            {x: -1, y: 0},
            {x: 1, y: 0},
        ];

        let result = []

        for(let d of dirs){
            let n = map.get(this.x + d.x, this.y + d.y);
            if (n instanceof GameObject){
                result.push(n);
            }
        }
        return result;
    }
}