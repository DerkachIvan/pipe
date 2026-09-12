declare class Pump extends GameObject {
    static sprites: {};
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, direction?: string);
    static directions: {
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
    CanConnectPipe(x: number, y: number): boolean;
    Update(): void;
    Rotate(): void;
    static loadSprites(): void;
    getSpriteKey(): string;
    Draw(): void;
    DrawInfo(): void;
}
//# sourceMappingURL=Pump.d.ts.map