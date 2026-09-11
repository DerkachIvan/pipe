declare class Item {
    static sprites: any[];
    name: string;
    type: string;
    maxStackSize: number;
    constructor(name?: string, type?: string, maxStackSize?: number);
    static loadSprites(): void;
    Draw(x: number, y: number, size: number): void;
}
//# sourceMappingURL=Items.d.ts.map