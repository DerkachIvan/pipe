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

    "IronBar": {
        machine: "Furnace",
        time: 1,
        input: [
            {
                material: Coal,
                amount: 1
            },
            {
                material: Copper,
                amount: 5
            }
        ],

        output: {
            product: IronBar,
            amount: 1
        }
    }
}