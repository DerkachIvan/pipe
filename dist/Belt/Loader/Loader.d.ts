declare class Loader extends GameObject {
    static sprites: {};
    constructor(ctx: any, x: any, y: any, direction?: string);
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
    Update(): void;
    static loadSprites(): void;
    getSpriteKey(): "D" | "L" | "R" | "U";
    Draw(): void;
    Rotate(): void;
}
//# sourceMappingURL=Loader.d.ts.map