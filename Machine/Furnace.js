class Furnace extends GameObject {
    static sprites = {}
    constructor(ctx, x, y){
        super(ctx, x, y);
        this.SetTag("Furnace");

        this.size = {width: 2, height: 2}
    }
}