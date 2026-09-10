class Fluid {
    constructor(nameOrType = "Empty", type = "Fluid") {
        const fallbackType = {
            name: "Empty",
            type: "Fluid",
            id: "empty",
            color: "rgb(0, 0, 0)"
        };

        if (typeof nameOrType === "object" && nameOrType !== null) {
            const fluidType = nameOrType;
            this.name = fluidType.name || fallbackType.name;
            this.type = fluidType.type || fallbackType.type;
            this.id = fluidType.id || this.name.toLowerCase();
            this.color = fluidType.color || fallbackType.color;
            this.quantity = typeof type === "number" ? type : 0;
            return;
        }

        const name = nameOrType || fallbackType.name;
        this.name = name;
        this.type = type || fallbackType.type;
        this.id = typeof name === "string" ? name.toLowerCase() : fallbackType.id;

        const fluidMap = globalThis.FLUID_TYPES || {};
        const fluidDefinition = fluidMap[this.id] || fluidMap.empty || fallbackType;

        this.color = fluidDefinition.color || fallbackType.color;
        this.quantity = 0;
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
}
