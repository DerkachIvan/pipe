globalThis.FLUID_TYPES = {};

const EmptyFluid = new Fluid("Empty", "Fluid");
EmptyFluid.id = "empty";
EmptyFluid.color = "rgb(0, 0, 0)";

const Water = new Fluid("Water", "Fluid");
Water.id = "water";
Water.color = "rgba(0, 100, 255, 0.4)";

const Oil = new Fluid("Oil", "Fluid");
Oil.id = "oil";
Oil.color = "rgba(139, 69, 19, 0.4)";

const FLUID_TYPES = {
    empty: EmptyFluid,
    water: Water,
    oil: Oil
};

globalThis.FLUID_TYPES = FLUID_TYPES;

const EMPTY_FLUID = EmptyFluid;
const WATER = Water;
const OIL = Oil;