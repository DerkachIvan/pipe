const Recipes = {
    "CompressedOil": {
        machine: "Compressor",

        input: {
            material: Oil,
            amount: 2
        },

        output: {
            product: CompressedOil,
            amount: 1
        }
    },

    "IronIngot": {
        machine: "Furnace",

        input: {
            material: IronOre,
            amount: 1
        },

        output: {
            product: IronIngot,
            amount: 1
        }
    }
}