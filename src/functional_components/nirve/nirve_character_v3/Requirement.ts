export interface IRequirement {
    description: string;
    mode: '>'|'<'|'>='|'<='|'='|'!='|'exists'|'!exists';
    value: number; // TODO: add spell, skill, etc.
    target: string;
}