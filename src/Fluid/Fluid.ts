// сделать чтобы можно было использовать в крафтах
class Fluid {
    type: FluidType;
    quantity: number;

    constructor(type: FluidType = EMPTY_FLUID, quantity: number = 0) {
        this.type = type;
        this.quantity = quantity;
    }

    get id() {
        return this.type?.id ?? "empty";
    }

    set id(value) {
        this.type = FLUID_TYPES[value] ?? EMPTY_FLUID;
    }

    get isEmpty() {
        return this.type.id === "empty" || this.quantity <= 0;
    }
}

