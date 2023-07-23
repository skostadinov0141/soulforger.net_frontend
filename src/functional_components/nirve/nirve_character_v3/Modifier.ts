
export interface LinkResolution{
    source: IModifier;
    target: any;
}

export interface IModifierLink {
    sourceId: string;
    sourceLocation: string[];
    targetId: string;
    targetLocation: string[];
}

export interface IModifier {
    passive: boolean;
    active: boolean;
    id: string;
    description: string;
    mode: 'add'|'remove'|'+'|'-'|'*'|'/'|'=';
    value: number; // TODO: add spell, skill, etc.
}