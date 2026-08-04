class BeltItem{
    constructor(x, y, size = 10, item = null){
        this.x = x;
        this.y = y;
        this.size = size;
        this.item = item;
    }

    Draw(){
        if (this.item != null){
            this.item.Draw(this.x, this.y, this.size);
        }
    }
}