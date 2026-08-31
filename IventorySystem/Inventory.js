class Inventory {
    slotSize = 20
    constructor(slotsAmount = 1){
        this.slotsAmount = slotsAmount;
        this.slots = [];
        for(let i = 0; i < slotsAmount; i++){
            this.slots.push(new Slot());
        }
    }

    Draw(ctx, x, y){
        for(let i = 0; i < this.slotsAmount; i++){
            let slot = this.slots[i];
            if(slot == null) continue
            
            slot.Draw(ctx, x + this.slotSize*i, y, this.slotSize)
        }
    }

    TryInsert(item, amount){
        for(let slot of this.slots){
            if(slot.TryInsert(item, amount)){
                return true;
            }
        }
        return false
    }

    TryGet(amount = 0, item = null){
        let targetAmount = amount
        let itemsGroups = {
            items: [],
            totalAmount: 0
        }
        
        for(let slot of this.slots){
            if(slot == null) continue;

            let itemGroup = slot.TryGet(amount, item)
            console.log(itemGroup)
            
            if(itemGroup.amount > 0){
                amount -= itemGroup.amount;
                itemsGroups.items.push(itemGroup)
                itemsGroups.totalAmount += itemGroup.amount;
            }

            if(amount == 0){
                break;
            }
        }

        return itemsGroups;
    }
}