class Slot {
    constItem: boolean;
    item: Item | null;
    amount: number;
    constructor(){
        this.constItem = false;
        this.item = null;
        this.amount = 0;
    }

    Draw(ctx: CanvasRenderingContext2D, x: number, y: number, slotSize: number): void {
        ctx.save(); 
        ctx.strokeStyle = "black";
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(x, y, slotSize, slotSize);
        ctx.strokeRect(x, y, slotSize, slotSize);
        
        if(this.item !== null){
            this.item.Draw(x + slotSize/2, y + slotSize/2, slotSize*0.8);
            
            ctx.fillStyle = "black";
            ctx.strokeStyle = "white"
            ctx.lineWidth = slotSize / 40
            ctx.font = "bold " + slotSize*0.6 + "px Arial";
            ctx.textAlign = "end"
            ctx.fillText(String(this.amount), x + slotSize*0.9, y + slotSize * 0.9);
            ctx.strokeText(String(this.amount), x + slotSize*0.9, y + slotSize * 0.9);
        }
        
        ctx.restore();
    }

    TryInsert(item: Item | null, amount: number): boolean {
        if(this.constItem){
            if(this.item?.name === item?.name){
                if(this.amount + amount > (item?.maxStackSize || 0)) return false;
                
                this.amount += amount;
                return true;
            }
            
            return false;
        }
        
        if(this.item === null){
            this.item = item;
            this.amount = amount;
            return true;
        }else if(this.item.name == item.name){
            if(this.amount + amount >= item.maxStackSize) return false;
            this.amount += amount;
            return true;
        }

        return false;
    }

    TryGet(amount = 0, item = null): {item: Item | null, amount: number} {
        if(amount <= 0){
            amount = this.amount;
        }

        if(item == null){
            item = this.item;
        }
        
        let itemGroup = {
            item: item,
            amount: 0
        }

        if(this.item == null){
            return itemGroup;
        }
        
        if(item?.name != this.item.name){
            return itemGroup;
        }

        let finalAmount = Math.min(this.amount, amount);
        this.amount -= finalAmount;

        itemGroup.amount = finalAmount;

        if(!this.constItem && this.amount == 0){
            this.item = null;
        }

        return itemGroup
    }
}
