declare class FluidGenerator extends FluidMachine {
    static sprites: {};
    constructor(ctx: any, x: any, y: any, capacity?: number);
    static loadSprites(): void;
    getSpriteKey(): string;
    Update(): void;
    Draw(): void;
}
//# sourceMappingURL=FluidGenerator.d.ts.map