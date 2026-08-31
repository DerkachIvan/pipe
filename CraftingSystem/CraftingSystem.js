class CraftingSystem {
    static CanCraft(inventory, recipe, mashineType){
        if(!inventory || !recipe){
            return false;
        }

        if(recipe.machine !== mashineType){
            return false;
        }

        const ingredients = Array.isArray(recipe.input)
        ? recipe.input
        : [recipe.input];

        for (const ingredient of ingredients){
            if(!this.HasItem(
                inventory,
                ingredient.material,
                ingredient.amount
            )){
                return false;
            }
        }

        return true;
    }

    static HasItem(inventory, item, amount){
        let total = 0;
        for(const slot of inventory.slots){
            if(!slot || !slot.item){
                continue;
            }

            if(slot.item.name === item.name){
                total += slot.amount;
            }

            if(total >= amount){
                return true;
            }
        }

        return false;
    }

    static ConsumeIngredients(inventory, recipe){
        const ingredients = Array.isArray(recipe.input)
        ? recipe.input
        : [recipe.input];

        for(const ingredient of ingredients){
            let remaining = ingredient.amount;

            while(remaining > 0){
                const group = inventory.TryGet(remaining, ingredient.material);

                if(group.totalAmount <= 0){
                    return false;
                }

                remaining -= group.totalAmount;
            }
        }

        return true;
    }
}