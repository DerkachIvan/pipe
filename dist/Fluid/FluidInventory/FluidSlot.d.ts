declare class FluidSlot {
    constFluid: boolean;
    fluid: Fluid | null;
    capacity: number;
    constructor(capacity?: number);
    Draw(ctx: CanvasRenderingContext2D, x: number, y: number, slotSize: number): void;
    TryInsert(fluid: Fluid | null, amount: number): boolean;
    TryGet(amount?: number, fluid?: Fluid | null): {
        fluid: Fluid | null;
        amount: number;
    };
}
//# sourceMappingURL=FluidSlot.d.ts.map