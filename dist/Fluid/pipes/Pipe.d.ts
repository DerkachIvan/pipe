declare class Pipe extends GameObject {
    static sprites: {};
    constructor(ctx: any, x: any, y: any);
    static loadSprites(): void;
    getSpriteKey(): string;
    getAdjacentFluidTypes(): Set<unknown>;
    canConnectTo(neighbor: any): boolean;
    UpdateJoinDirections(): void;
    Update(): void;
    Delete(): void;
    Draw(): void;
    getNeighborsPipes(): any[];
    DrawInfo(ctx: any): void;
}
//# sourceMappingURL=Pipe.d.ts.map