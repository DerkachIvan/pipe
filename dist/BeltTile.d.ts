declare class BeltTile extends GameObject implements InventoryInter {
    static sprites: {};
    nextBeltTile: BeltTile | null;
    previousBeltTile: BeltTile | null;
    item: Item | null;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, direction?: string, speed?: number);
    static dirs: {
        up: {
            input: {
                x: number;
                y: number;
            };
            output: {
                x: number;
                y: number;
            };
        };
        down: {
            input: {
                x: number;
                y: number;
            };
            output: {
                x: number;
                y: number;
            };
        };
        left: {
            input: {
                x: number;
                y: number;
            };
            output: {
                x: number;
                y: number;
            };
        };
        right: {
            input: {
                x: number;
                y: number;
            };
            output: {
                x: number;
                y: number;
            };
        };
    };
    CanInsert(item: Item, amount: number): boolean;
    HasItem(): boolean;
    LoaderTryGet(): {
        items: any[];
        totalAmount: number;
    };
    LoaderTryInsert(item: Item): void;
    setItemStartEndPoint(): void;
    Update(): void;
    attemptTransfer(visited: Set<BeltTile>): boolean;
    static loadSprites(): void;
    getSpriteKey(): string;
    Draw(): void;
    DrawItem(): void;
    TryInsert(item: Item | null): boolean;
    Rotate(): void;
}
//# sourceMappingURL=BeltTile.d.ts.map