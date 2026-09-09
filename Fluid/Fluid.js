class Fluid {
    constructor(type = EMPTY_FLUID, quantity = 0) {
        this.type = type;
        this.quantity = quantity;
    }

    get id() {
        return this.type?.id ?? "empty";
    }

    set id(value) {
        this.type = FLUID_TYPES[value] ?? EMPTY_FLUID;
    }
}
