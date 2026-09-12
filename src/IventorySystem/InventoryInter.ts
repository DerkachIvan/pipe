interface InventoryInter {
    HasItem(): boolean;
    LoaderTryGet()
    LoaderTryInsert(item: Item)
    get item(): Item | null;
}