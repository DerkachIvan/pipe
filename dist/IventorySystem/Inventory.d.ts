declare class Inventory {
    slotSize: number;
    slotsAmount: number;
    slots: Slot[];
    constructor(slotsAmount?: number);
    Draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;
    DrawHtml(parent: HTMLElement): void;
    HasItem(): boolean;
    CanInsert(item: Item, amount: number): boolean;
    TryInsert(item: Item, amount: number): boolean;
    TryGet(item: Item | null, amount?: number): {
        items: any[];
        totalAmount: number;
    };
}
//# sourceMappingURL=Inventory.d.ts.map