export interface IModifier {
    passive: boolean;
    active: boolean;
    id: string;
    description: string;
    mode: 'add'|'remove'|'+'|'-'|'*'|'/'|'=';
    value: number; // TODO: add spell, skill, etc.
    target: string;
}