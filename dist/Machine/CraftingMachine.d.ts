declare class CraftingMachine extends GameObject {
    constructor(ctx: any, x: any, y: any, width: any, height: any, amountOfInputSlots: any, amountOfOutputSlots: any);
    SetRecipe(recipe: any): boolean;
    Update(): void;
    GetProgress(): number;
}
//# sourceMappingURL=CraftingMachine.d.ts.map