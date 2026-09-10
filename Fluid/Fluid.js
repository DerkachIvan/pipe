class Fluid {
    constructor(type = EMPTY_FLUID, quantity = 0) {
        this.type = typeof type === "string" ? (FLUID_TYPES[type] ?? EMPTY_FLUID) : (type ?? EMPTY_FLUID);
        this.quantity = quantity;
    }

    static fromType(typeKey) {
        if (!typeKey) return new Fluid("Empty", "Fluid");
        const fluidMap = globalThis.FLUID_TYPES || {};
        const base = fluidMap[typeKey] || fluidMap.empty || { name: "Empty", type: "Fluid", id: "empty", color: "rgb(0, 0, 0)" };
        return new Fluid(base);
    }

    setType(typeKey) {
        const fluidMap = globalThis.FLUID_TYPES || {};
        const base = fluidMap[typeKey] || fluidMap.empty || { name: "Empty", type: "Fluid", id: "empty", color: "rgb(0, 0, 0)" };
        this.name = base.name;
        this.type = base.type;
        this.id = base.id;
        this.color = base.color;
    }

    get fluidType() {
        return this.id;
    }

    set fluidType(value) {
        this.setType(typeof value === "string" ? value : value?.id || "empty");
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
