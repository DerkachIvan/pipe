class Camera {
    x: number;
    y: number;
    zoom: number;

    constructor(){
        this.x = 0;
        this.y = 0;

        this.zoom = 2;
    }

    Begin(ctx){
        ctx.save();

        ctx.scale(this.zoom, this.zoom);
        ctx.translate(-this.x, -this.y);
    }

    End(ctx){
        ctx.restore();
    }
}
