declare class Pump extends FluidMachine {
    static sprites: {};
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, direction?: string);
    Update(): void;
    Rotate(): void;
    static loadSprites(): void;
    getSpriteKey(): string;
    Draw(): void;
    DrawInfo(): void;
}
//# sourceMappingURL=Pump.d.ts.map