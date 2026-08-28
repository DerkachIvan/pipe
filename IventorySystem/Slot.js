class Slot {
    constructor(){
        this.constItem = false;
        this.item = null;
        this.amount = 0;
    }

    Draw(){
        if(this.item !== null){
            this.item.Draw();
        }
    }

    TryInsert(item, amount){
        if(this.constItem){
            if(this.item.name === item.name){
                this.amount += amount;
                return true;
            }

            return false;
        }
        
        if(this.item === null){
            this.item = item;
            this.amount = amount;
            return true;
        }else if(this.item.name === item.name){
            this.amount += amount;
            return true;
        }

        return false;
    }

    TryGet(amount = 0, item = null){
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