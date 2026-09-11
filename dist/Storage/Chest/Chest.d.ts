declare class Chest extends GameObject {
    static sprites: {};
    constructor(ctx: any, x: any, y: any);
    static loadSprites(): void;
    Draw(): void;
    DrawInfo(ctx: any): void;
    DrawInfoHtml(container: any, offsetX: any, offsetY: any, scale: any): void;
    DrawInventory(ctx: any): void;
}
//# sourceMappingURL=Chest.d.ts.map