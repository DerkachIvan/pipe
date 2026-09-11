declare class CraftingSystem {
    static UpdateMachine(machine: any): void;
    static Start(machine: any): boolean;
    static Finish(machine: any): void;
    static HasIngredients(machine: any, recipe: any): boolean;
    static ConsumeIngredients(machine: any, recipe: any): boolean;
    static CanOutput(machine: any, recipe: any): boolean;
    static GetProgress(machine: any): number;
}
//# sourceMappingURL=CraftingSystem.d.ts.map