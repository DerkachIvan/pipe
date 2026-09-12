declare class Chest extends GameObject implements InventoryInter {
    static sprites: {};
    inventory: Inventory;
    constructor(ctx: any, x: any, y: any);
    get item(): Item | null;
    HasItem(): boolean;
    LoaderTryGet(): {
        items: any[];
        totalAmount: number;
    };
    LoaderTryInsert(item: Item): void;
    CanInsert(item: Item, amount: number): boolean;
    static loadSprites(): void;
    Draw(): void;
    DrawInfo(ctx: any): void;
    DrawInfoHtml(container: any, offsetX: any, offsetY: any, scale: any): void;
    DrawInventory(ctx: any): void;
}
//# sourceMappingURL=Chest.d.ts.map