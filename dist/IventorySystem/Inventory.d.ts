declare class Inventory {
    slotSize: number;
    slotsAmount: number;
    slots: Slot[];
    constructor(slotsAmount?: number);
    Draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;
    DrawHtml(parent: HTMLElement, x: number, y: number, scale?: number): void;
    TryInsert(item: any, amount: any): boolean;
    TryGet(amount?: number, item?: any): {
        items: any[];
        totalAmount: number;
    };
}
//# sourceMappingURL=Inventory.d.ts.map