class PipeSystem{
    maxFlowLevel = 10;
    map: GameMap;
    pipes: Pipe[];
    constructor(map: GameMap){
        this.map = map;
        this.pipes = map.getAllWithTag("Pipe") as Pipe[];
    }

    Update(){
        this.pipes = this.map.getAllWithTag("Pipe") as Pipe[];
        this.bfs();
        this.flowStep();
    }

    canTransferFluid(sourcePipe: Pipe, targetPipe: Pipe) {
        if (!sourcePipe || !targetPipe) return false;
        if (!isFinite(targetPipe.flowLevel) || targetPipe.flowLevel <= sourcePipe.flowLevel) return false;

        const targetCurrentType = targetPipe.nextFluidType || targetPipe.fluidType || "empty";
        const sourceType = sourcePipe.fluidType || "empty";
        const targetTypeId = typeof targetCurrentType === "string" ? targetCurrentType : targetCurrentType.id || "empty";
        const sourceTypeId = typeof sourceType === "string" ? sourceType : sourceType.id || "empty";

        const targetIsEmpty = targetPipe.currentFill <= 0 || targetTypeId === "empty" || !targetPipe.hasFluid;
        const sameFluidType = targetTypeId === sourceTypeId;

        if (targetTypeId !== "empty" && !sameFluidType) {
            return false;
        }

        return targetIsEmpty || sameFluidType;
    }

    bfs(){
        for(let p of this.pipes){
            p.flowLevel = Infinity;
        }

        let queue = [];
        for(let p of this.pipes){
            if(p.isSource){
                p.flowLevel = 0;
                queue.push(p);
            }
        }

        while(queue.length){
            let p = queue.shift();
            if(p.flowLevel >= this.maxFlowLevel) continue;
            for(let n of p.getNeighborsPipes()){
                let nextLevel = p.flowLevel + 1;

                if(nextLevel < n.flowLevel){
                    n.flowLevel = nextLevel;
                    queue.push(n);
                }
            }
        }
    }

    flowStep(){
        for(let p of this.pipes){
            p.nextFill = p.currentFill;
            p.nextFluidType = p.fluidType;
            if (p.currentFill <= p.thresholdFluidTypeReset) {
                p.currentFill = 0;
                p.fluidType = "empty";
                p.hasFluid = false;
                p.nextFluidType = "empty";
            }
        }

        for(let p of this.pipes){
            if (p.currentFill <= 0) continue;

            let valid = [];

            for(let n of p.getNeighborsPipes()){
                if(!isFinite(n.flowLevel)) continue;

                if (!this.canTransferFluid(p, n)) continue;

                if (n.currentFill <= 0 || n.fluidType === "empty" || !n.hasFluid) {
                    if (n.nextFluidType === "empty" || n.nextFluidType === p.fluidType) {
                        n.nextFluidType = p.fluidType;
                        n.hasFluid = true;
                    }
                }

                valid.push(n);
            }

            if (valid.length === 0) continue;

            let transferPerNeighbor = p.currentFill / valid.length;

            for(let n of valid){
                let transfer = transferPerNeighbor;
                let space = n.capacity - n.nextFill;
                let actual = Math.min(transfer, space);

                p.nextFill -= actual;
                n.nextFill += actual;
                if (n.nextFill > 0 && (n.nextFluidType === "empty" || n.nextFluidType === p.fluidType)) {
                    n.nextFluidType = p.fluidType;
                    n.hasFluid = true;
                }
            }
        }

        for(let p of this.pipes){
            for(let n of p.getNeighborsPipes()){
                if(n.flowLevel !== p.flowLevel) continue;
                if (n.fluidType !== "empty" && n.fluidType !== p.fluidType) continue;

                let diff = p.nextFill - n.nextFill;
                if (diff <= 0) continue;
                let flow = diff * 0.25;

                let space = n.capacity - n.nextFill;
                let actual = Math.min(flow, space);

                if (actual > 0) {
                    if ((n.currentFill <= 0 || n.fluidType === "empty" || !n.hasFluid) && (n.nextFluidType === "empty" || n.nextFluidType === p.fluidType)) {
                        n.nextFluidType = p.fluidType;
                        n.hasFluid = true;
                    }
                }

                p.nextFill -= actual;
                n.nextFill += actual;
            }
        }

        for(let p of this.pipes){
            p.currentFill = p.nextFill;
            p.fluidType = p.nextFluidType;
            if (p.currentFill <= p.thresholdFluidTypeReset) {
                p.currentFill = 0;
                p.fluidType = "empty";
                p.hasFluid = false;
            }
        }
    }
}
