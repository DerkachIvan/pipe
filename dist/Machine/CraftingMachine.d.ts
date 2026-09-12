declare class CraftingMachine extends GameObject implements InventoryInter {
    input: Inventory;
    output: Inventory;
    constructor(ctx: any, x: any, y: any, width: any, height: any, amountOfInputSlots: any, amountOfOutputSlots: any);
    get item(): Item | null;
    HasItem(): boolean;
    LoaderTryGet(): {
        items: any[];
        totalAmount: number;
    };
    LoaderTryInsert(item: Item): void;
    CanInsert(item: Item, amount: number): boolean;
    SetRecipe(recipe: any): boolean;
    Update(): void;
    GetProgress(): number;
}
//# sourceMappingURL=CraftingMachine.d.ts.map