class PipeSystem{
    maxFlowLevel = 20;
    constructor(map){
        this.map = map;
        this.pipes = map.getAllWithTag("Pipe");
    }

    Update(){
        this.pipes = map.getAllWithTag("Pipe")
        this.bfs();
        this.flowStep();
        this.consumeStep();
        this.applyStep();
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

            for(let n of p.getNeighbors(this.map)){
                let newLevel = p.flowLevel + 1;
                if(newLevel < n.flowLevel){
                    n.flowLevel = newLevel;
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

            for(let n of p.getNeighbors(this.map)){
                if(!isFinite(n.flowLevel)) continue;
                if (n.flowLevel > p.flowLevel){
                    valid.push(n);
                }
            }

            if (valid.length === 0) continue;

            let totalWeight = 0;

            for(let n of valid){
                totalWeight += (n.flowLevel - p.flowLevel);
            }

            for(let n of valid){

                let weight = (n.flowLevel - p.flowLevel) / totalWeight;

                let transfer = p.currentFill * weight;

                let space = n.capacity - n.nextFill;
                let actual = Math.min(transfer, space);

                p.nextFill -= actual;
                n.nextFill += actual;
            }
        }

        for(let p of this.pipes){
            for(let n of p.getNeighbors(this.map)){
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
    }

    consumeStep(){
        for(let p of this.pipes){
            if(p.isOutput){
                let consumeRate = 0.1;
                let used = Math.min(p.nextFill, consumeRate);
                p.nextFill -= used;
            }
        }
    }

    applyStep(){
        for (let p of this.pipes){
            p.currentFill = Math.max(0, Math.min(p.capacity, p.nextFill));
        }
    }
}