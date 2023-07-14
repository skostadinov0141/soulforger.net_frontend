export interface IItem {
    name: string;
    description: string;
}

export default interface IInventory {
    items: IItem[];
}