"use strict";
class FluidSlot {
    constructor(capacity = 1000) {
        this.constFluid = false;
        this.fluid = null;
        this.capacity = capacity;
    }
    Draw(ctx, x, y, slotSize) {
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "lightgray";
        ctx.fillRect(x, y, slotSize, slotSize);
        ctx.strokeRect(x, y, slotSize, slotSize);
        if (this.fluid !== null && this.fluid.quantity > 0) {
            const fillPercent = this.fluid.quantity / this.capacity;
            const fillHeight = slotSize * Math.min(1, fillPercent);
            ctx.fillStyle = this.fluid.type.color ?? "blue";
            ctx.fillRect(x, y + slotSize - fillHeight, slotSize, fillHeight);
        }
        ctx.fillStyle = "black";
        ctx.strokeStyle = "white";
        ctx.lineWidth = slotSize / 40;
        ctx.font = "bold" + slotSize * 0.6 + "px Arial";
        ctx.textAlign = "end";
        ctx.fillText(String(this.fluid.quantity), x + slotSize * 0.9, y + slotSize * 0.9);
        ctx.strokeText(String(this.fluid.quantity), x + slotSize * 0.9, y + slotSize * 0.9);
        ctx.restore();
    }
    TryInsert(fluid, amount) {
        if (fluid === null)
            return false;
        if (amount <= 0)
            return false;
        if (this.constFluid) {
            if (this.fluid === null)
                return false;
            if (this.fluid.id !== fluid.id)
                return false;
        }
        if (this.fluid === null) {
            if (amount > this.capacity)
                return false;
            this.fluid = new Fluid(fluid.type, amount);
            return true;
        }
        if (this.fluid.id !== fluid.id)
            return false;
        if (this.fluid.quantity + amount > this.capacity)
            return false;
        this.fluid.quantity += amount;
        return true;
    }
    TryGet(amount = 0, fluid = null) {
        if (amount <= 0) {
            if (this.fluid === null) {
                return { fluid: null, amount: 0 };
            }
            amount = this.fluid.quantity;
        }
        if (fluid === null) {
            fluid = this.fluid;
        }
        const fluidGroup = {
            fluid: fluid,
            amount: 0
        };
        if (this.fluid === null)
            return fluidGroup;
        if (this.fluid.id !== fluid.id)
            return fluidGroup;
        const finalAmount = Math.min(amount, this.fluid.quantity);
        this.fluid.quantity -= finalAmount;
        fluidGroup.amount = finalAmount;
        if (!this.constFluid && this.fluid.quantity <= 0) {
            this.fluid = null;
        }
        return fluidGroup;
    }
}
//# sourceMappingURL=FluidSlot.js.map