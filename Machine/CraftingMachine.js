class CraftingMachine extends GameObject {
    constructor(ctx, x, y, width, height, amountOfInputSlots, amountOfOutputSlots){
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

    SetRecipe(recipe){
        if(!recipe){
            this.recipe = null;
            return false;
        }

        if(recipe.machineType !== undefined &&
            recipe.machineType !== this.machineType
        ){
            return false;
        }

        this.recipe = recipe;
        
        return true;
    }

    Update(){
        CraftingSystem.UpdateMachine(this);
    }

    GetProgress(){
        return CraftingSystem.GetProgress(this);
    }
}