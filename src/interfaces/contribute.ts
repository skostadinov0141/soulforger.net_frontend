export interface SemanticSection{
    title:string
    content:string
}

export interface IDbEntry{
    title:string,
    tags:string,
    link:string,
    semantics: SemanticSection[]
}