class Fluid {
    constructor(type = "empty", quantity = 0) {
        this.type = this.normalizeType(type);
        this.quantity = Number.isFinite(quantity) ? quantity : 0;
    }

    normalizeType(type) {
        const fluidMap = globalThis.FLUID_TYPES || {};

        if (typeof type === "string") {
            return fluidMap[type] || fluidMap.empty || {
                id: "empty",
                name: "Empty",
                color: "rgb(0, 0, 0)"
            };
        }

        if (type && typeof type === "object") {
            return type;
        }

        return fluidMap.empty || {
            id: "empty",
            name: "Empty",
            color: "rgb(0, 0, 0)"
        };
    }

    get id() {
        return this.type?.id ?? "empty";
    }

    set id(value) {
        const fluidMap = globalThis.FLUID_TYPES || {};
        this.type = fluidMap[value] || fluidMap.empty || {
            id: "empty",
            name: "Empty",
            color: "rgb(0, 0, 0)"
        };
    }

    get fluidType() {
        return this.id;
    }

    set fluidType(value) {
        this.id = typeof value === "string" ? value : value?.id ?? "empty";
    }

    get currentFill() {
        return this.quantity;
    }

    set currentFill(value) {
        this.quantity = Number.isFinite(value) ? value : 0;
    }

    reset() {
        const fluidMap = globalThis.FLUID_TYPES || {};
        this.type = fluidMap.empty || {
            id: "empty",
            name: "Empty",
            color: "rgb(0, 0, 0)"
        };
        this.quantity = 0;
    }
}
