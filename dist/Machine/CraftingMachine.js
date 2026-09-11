"use strict";
class CraftingMachine extends GameObject {
    constructor(ctx, x, y, width, height, amountOfInputSlots, amountOfOutputSlots) {
        super(ctx, x, y, width, height);
        this.SetTag("CraftingMachine");
        this.SetTag("HasInventory");
        this.SetTag("HasInput");
        this.SetTag("HasOutput");
        this.input = new Inventory(amountOfInputSlots);
        this.output = new Inventory(amountOfOutputSlots);
        this.recipe = null;
        this.crafting = false;
        this.craftProgress = 0;
        this.craftTime = 0;
    }
    SetRecipe(recipe) {
        if (!recipe) {
            this.recipe = null;
            this.input = new Inventory(0);
            this.output = new Inventory(0);
            return false;
        }
        if (recipe.machineType !== undefined &&
            recipe.machineType !== this.machineType) {
            return false;
        }
        this.recipe = recipe;
        this.input = new Inventory(recipe.input.length);
        for (let i = 0; i < recipe.input.length; i++) {
            this.input.slots[i].constItem = true;
            this.input.slots[i].item = recipe.input[i].material;
        }
        const outputs = Array.isArray(recipe.output)
            ? recipe.output
            : [recipe.output];
        this.output = new Inventory(outputs.length);
        for (let i = 0; i < outputs.length; i++) {
            this.output.slots[i].constItem = true;
            this.output.slots[i].item = outputs[i].product;
        }
        return true;
    }
    Update() {
        CraftingSystem.UpdateMachine(this);
    }
    GetProgress() {
        return CraftingSystem.GetProgress(this);
    }
}
//# sourceMappingURL=CraftingMachine.js.map