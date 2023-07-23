export default interface IComputedValue {
    paths: string[][];
    values: IValue[];
    calculation: string;
}

export interface IValue {
    k: string;
    v: number;
}