class CraftingSystem {
    static UpdateMachine(machine){
        if(!machine.recipe) return;

        if(machine.crafting){
            machine.craftProgress += deltaTime;

            if(machine.craftProgress >= machine.craftTime){
                this.Finish(machine);
            }

            return;
        }

        this.Start(machine);
    }

    static Start(machine){
        const recipe = machine.recipe;

        if(recipe.machineType !== undefined && recipe.machineType !== machine.machineType){
            return false;
        }

        if(!this.HasIngredients(machine, recipe)){
            return false;
        }

        if(!this.CanOutput(machine, recipe)){
            return false;
        }

        if(!this.ConsumeIngredients(machine, recipe)){
            return false;
        }

        machine.crafting = true;
        machine.craftProgress = 0;
        machine.craftTime = recipe.time ?? 1;
        
        return true;
    }

    static Finish(machine){
        const recipe = machine.recipe;

        if(!recipe){
            return;
        }

        machine.output.TryInsert(
            recipe.output.product,
            recipe.output.amount
        );

        machine.crafting = false;
        machine.craftProgress = 0;
        machine.craftTime = 0;
    }

    static HasIngredients(machine, recipe){
        const inputs = Array.isArray(recipe.input)
        ? recipe.input
        : [recipe.input];

        for(const input of inputs){
            let amount = 0;

            for(const slot of machine.input.slots){
                if(slot == null || slot.item == null){
                    continue;
                }

                if(slot.item === input.material){
                    amount += slot.amount;
                }

                if(amount >= input.amount){
                    break;
                }
            }

            if(amount < input.amount){
                return false;
            }
        }
        
        return true;
    }

    static ConsumeIngredients(machine, recipe){
        const inputs = Array.isArray(recipe.input)
        ? recipe.input
        : [recipe.input];

        for(const input of inputs){
            const result = machine.input.TryGet(
                input.amount,
                input.material
            );

            if(result.totalAmount < input.amount){
                return false;
            }
        }

        return true;
    }

    static CanOutput(machine, recipe){
        const product = recipe.output.product;

        for(const slot of machine.output.slots){
            if(slot == null){
                continue;
            }

            if(slot.item == null){
                return true;
            }

            if(slot.item === product){
                if(slot.amount + recipe.output.amount <= product.maxStackSize){
                    return true;
                }
            }
        }

        return false;
    }

    static GetProgress(machine){
        if(!machine.crafting){
            return 0;
        }

        if(machine.craftTime <= 0){
            return 1;
        }

        return Math.min(machine.craftProgress / machine.craftTime, 1);
    }
}