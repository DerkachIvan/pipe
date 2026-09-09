class FluidType {
    constructor(id, color, name = id) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

const FLUID_TYPES = {
    empty: new FluidType("empty", "rgb(0, 0, 0)", "Empty"),
    water: new FluidType("water", "rgba(0, 100, 255, 0.4)", "Water"),
    oil: new FluidType("oil", "rgba(139, 69, 19, 0.4)", "Oil")
};

const EMPTY_FLUID = new FluidType("empty", "rgb(0, 0, 0)", "Empty");
const WATER = FLUID_TYPES.water;
const OIL = FLUID_TYPES.oil;