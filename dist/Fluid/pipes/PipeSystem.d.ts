declare class PipeSystem {
    maxFlowLevel: number;
    map: GameMap;
    pipes: Pipe[];
    constructor(map: GameMap);
    Update(): void;
    canTransferFluid(sourcePipe: Pipe, targetPipe: Pipe): boolean;
    bfs(): void;
    flowStep(): void;
}
//# sourceMappingURL=PipeSystem.d.ts.map