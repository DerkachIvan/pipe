class GameObject {
    static SELECTED_OBJECT = null;
    cellSize = 30;
    selected = false;
    tag = ["GameObject"];
    ID = -1;
    selected = false;
    size = {width: 1, height: 1}
    constructor(ctx, x, y, width = 1, height = 1) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size.width = width;
        this.size.height = height;
        this.leftBound = x * this.cellSize ;
        this.rightBound = (x + this.size.width) * this.cellSize;
        this.topBound = y * this.cellSize;
        this.bottomBound = (y + this.size.height) * this.cellSize;
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

    static DrawSelectedObjectInfoHtml(container, camera, canvas) {
        // Пересобираем панель, чтобы содержимое отражало актуальные слоты.
        container.replaceChildren();
        if (!(GameObject.SELECTED_OBJECT instanceof GameObject)) {
            return;
        }

        const canvasRect = canvas.getBoundingClientRect();
        // Старые координаты передаются для совместимости, но HTML-панель их не использует.
        GameObject.SELECTED_OBJECT.DrawInfoHtml(
            container,
            canvasRect.left - camera.x * camera.zoom,
            canvasRect.top - camera.y * camera.zoom,
            camera.zoom
        );
        GameObject.SELECTED_OBJECT.selected = true;
    }

    SetTag(tag){
        this.tag.push(tag);
    }

    CheckTag(...tags){
        return tags.some(tag => this.tag.includes(tag));
    }

    Rotate(){

    }

    Start(){

    }

    Update(){

    }

    Delete(){

    }

    Draw() {

    }

    static loadSprites(){

    }

    DrawInfo(ctx) {
        
    }

    DrawInfoHtml(container, offsetX, offsetY, scale) {
    }

    CreateHtmlPreview(parent, imageSrc, objectName) {
        const preview = document.createElement("div");
        preview.className = "object-preview";

        const image = document.createElement("img");
        image.src = imageSrc;
        image.alt = objectName;
        preview.appendChild(image);
        parent.appendChild(preview);
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