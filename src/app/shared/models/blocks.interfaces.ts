export class Property {
    alias: string = '';
    default: number = null;
    name: string = '';
};

export interface IBlock {
    _id?: string,
    blockType: string,
    properties: Property[],
}