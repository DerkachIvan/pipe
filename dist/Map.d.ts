declare class GameMap {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    cellSize: number;
    grid: (GameObject | null)[][];
    objects: GameObject[];
    FluidMashines: GameObject[];
    Pipes: GameObject[];
    Belts: GameObject[];
    Others: GameObject[];
    lastObjectID: number;
    gridCanvas: HTMLCanvasElement;
    gridCanvasCtx: CanvasRenderingContext2D;
    constructor(ctx: CanvasRenderingContext2D, width: number, height: number, cellSize: number);
    canPlace(object: GameObject): boolean;
    set(x: number, y: number, object: GameObject): void;
    get(x: number, y: number): GameObject | null;
    drawStaticGrid(): void;
    getAllWithTag(tag: string): GameObject[] | null;
    removeFromArray(array: GameObject[], object: GameObject): void;
    updateNeighborConnections(x: number, y: number, width?: number, height?: number): void;
    deleteGameObject(x: number, y: number): void;
    outOfBounds(x: number, y: number): boolean;
    Start(): void;
    Update(): void;
    Draw(): void;
}
//# sourceMappingURL=Map.d.ts.map