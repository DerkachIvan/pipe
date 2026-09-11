class Inventory {
    slotSize = 20
    slotsAmount: number;
    slots: Slot[];
    constructor(slotsAmount = 1){
        this.slotsAmount = slotsAmount;
        this.slots = [];
        for(let i = 0; i < slotsAmount; i++){
            this.slots.push(new Slot());
        }
    }

    Draw(ctx: CanvasRenderingContext2D, x: number, y: number){
        for(let i = 0; i < this.slotsAmount; i++){
            let slot = this.slots[i];
            if(slot == null) continue
            
            slot.Draw(ctx, x + this.slotSize*i, y, this.slotSize)
        }
    }

    DrawHtml(parent: HTMLElement, x: number, y: number, scale = 1){
        // Создаём HTML-представление инвентаря вместо отрисовки в canvas.
        const inventoryElement = document.createElement("div");
        inventoryElement.className = "inventory";

        for(let slot of this.slots){
            const slotElement = document.createElement("div");
            slotElement.className = "inventory-slot";

            if(slot !== null && slot.item !== null){
                // Картинка и количество отображаются только для занятого слота.
                const itemImage = document.createElement("img");
                itemImage.src = `IventorySystem/Items/Sprites/${slot.item.name}.png`;
                itemImage.alt = slot.item.name;
                slotElement.appendChild(itemImage);

                const amountElement = document.createElement("span");
                amountElement.className = "inventory-amount";
                amountElement.textContent = String(slot.amount);
                slotElement.appendChild(amountElement);
            }

            inventoryElement.appendChild(slotElement);
        }

        parent.appendChild(inventoryElement);
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
            //console.log(itemGroup)
            
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
