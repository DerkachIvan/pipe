class PipeSystem{
    maxFlowLevel = 10;
    constructor(map){
        this.map = map;
        this.pipes = map.getAllWithTag("Pipe");
    }

    Update(){
        this.pipes = this.map.getAllWithTag("Pipe");
        this.bfs();
        this.flowStep();
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
        }

        for(let p of this.pipes){
            if (p.currentFill <= 0) continue;

            let valid = [];

            for(let n of p.getNeighborsPipes()){
                if(!isFinite(n.flowLevel)) continue;
                if (n.flowLevel > p.flowLevel){
                    valid.push(n);
                }
            }

            if (valid.length === 0) continue;

            let transferPerNeighbor = p.currentFill / valid.length;

            for(let n of valid){
                let transfer = transferPerNeighbor;
                let space = n.capacity - n.nextFill;
                let actual = Math.min(transfer, space);

                p.nextFill -= actual;
                n.nextFill += actual;
            }
        }

        for(let p of this.pipes){
            for(let n of p.getNeighborsPipes()){
                if(n.flowLevel !== p.flowLevel) continue;
                let diff = p.nextFill - n.nextFill;
                if (diff <= 0) continue;
                let flow = diff * 0.25;

                let space = n.capacity - n.nextFill;
                let actual = Math.min(flow, space);

                p.nextFill -= actual;
                n.nextFill += actual;
            }
        }

        for(let p of this.pipes){
            p.currentFill = p.nextFill;
        }
    }
}