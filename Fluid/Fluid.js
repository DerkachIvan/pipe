class Fluid {
    constructor(type = EMPTY_FLUID, quantity = 0) {
        this.type = typeof type === "string" ? (FLUID_TYPES[type] ?? EMPTY_FLUID) : (type ?? EMPTY_FLUID);
        this.quantity = quantity;
    }

    get id() {
        return this.type?.id ?? "empty";
    }

    set id(value) {
        this.type = FLUID_TYPES[value] ?? EMPTY_FLUID;
    }

    get fluidType() {
        return this.id;
    }

    set fluidType(value) {
        this.id = value;
    }

    get currentFill() {
        return this.quantity;
    }

    set currentFill(value) {
        this.quantity = value;
    }

    reset() {
        this.type = EMPTY_FLUID;
        this.quantity = 0;
    }
}
