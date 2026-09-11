declare class Slot {
    constItem: boolean;
    item: Item | null;
    amount: number;
    constructor();
    Draw(ctx: CanvasRenderingContext2D, x: number, y: number, slotSize: number): void;
    TryInsert(item: Item | null, amount: number): boolean;
    TryGet(amount?: number, item?: any): {
        item: Item | null;
        amount: number;
    };
}
//# sourceMappingURL=Slot.d.ts.map