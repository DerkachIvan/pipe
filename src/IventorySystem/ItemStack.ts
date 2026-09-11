class Stack{
    amount: number;
    item: Item | null;
    constructor(amount = 0, type = null) {
        this.amount = amount;
        this.item = type;
    }
}
