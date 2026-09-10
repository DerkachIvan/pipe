globalThis.FLUID_TYPES = {};

const EMPTY_FLUID = {
    id: "empty",
    name: "Empty",
    color: "rgb(0, 0, 0)"
};

const WATER = {
    id: "water",
    name: "Water",
    color: "rgba(0, 100, 255, 0.4)"
};

const OIL = {
    id: "oil",
    name: "Oil",
    color: "rgba(139, 69, 19, 0.4)"
};

const FLUID_TYPES = {
    empty: EMPTY_FLUID,
    water: WATER,
    oil: OIL
};

globalThis.FLUID_TYPES = FLUID_TYPES;

const EMPTY = EMPTY_FLUID;
const WATER_FLUID = WATER;
const OIL_FLUID = OIL;