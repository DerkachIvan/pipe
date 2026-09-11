declare class GameObject {
    static SELECTED_OBJECT: GameObject | null;
    [key: string]: any;
    cellSize: number;
    selected: boolean;
    tag: string[];
    ID: number;
    size: {
        width: number;
        height: number;
    };
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    leftBound: number;
    rightBound: number;
    topBound: number;
    bottomBound: number;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, width?: number, height?: number);
    GetID(): number;
    static DrawSelectedObjectInfo(ctx: any): void;
    static DrawSelectedObjectInfoHtml(container: any, camera: any, canvas: any): void;
    SetTag(tag: any): void;
    CheckTag(...tags: any[]): boolean;
    Rotate(): void;
    Start(): void;
    Update(): void;
    Delete(): void;
    Draw(): void;
    static loadSprites(): void;
    DrawInfo(ctx: any): void;
    DrawInfoHtml(container: any, offsetX: any, offsetY: any, scale: any): void;
    CreateHtmlPreview(parent: any, imageSrc: any, objectName: any): void;
    getNeighbors(): any[];
}
//# sourceMappingURL=object.d.ts.map