declare class PipeSystem {
    maxFlowLevel: number;
    map: GameMap;
    pipes: GameObject[];
    constructor(map: GameMap);
    Update(): void;
    canTransferFluid(sourcePipe: any, targetPipe: any): boolean;
    bfs(): void;
    flowStep(): void;
}
//# sourceMappingURL=PipeSystem.d.ts.map