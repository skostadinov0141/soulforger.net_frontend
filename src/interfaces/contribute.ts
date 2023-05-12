export interface SemanticSection{
    title:string
    content:string
}

export interface IDbEntry{
    title:string,
    tags:string,
    link:string,
    semantics: SemanticSection[],
    framework_data: AdvantageDisadvantageSkill | Species | Culture | Profession | SupernaturalAbility | MagicalSong | undefined
}

interface DefaultFrameworkData{
    category:string
    requirements: any[] | undefined
    modifiers: any[] | undefined
}

export interface AdvantageDisadvantageSkill extends DefaultFrameworkData{
    ap_mod:number
}

export interface Species extends DefaultFrameworkData{
    ap_cost:number
    lep_base: number
    sk_base:number
    zk_base:number
    gs_base:number
    usual_cultures:string[]
    highly_recommended_advantages:string[]
    highly_recommended_disadvantages:string[]
    ususal_advantages:string[]
    usual_disadvantages:string[]
    unususal_advantages:string[]
    unusual_disadvantages:string[]
}

export interface Culture extends DefaultFrameworkData{
    language:string[]
    written_language:string[]
    social_status:string
    usual_professions:string[]
    ususal_advantages:string[]
    usual_disadvantages:string[]
    unususal_advantages:string[]
    unusual_disadvantages:string[]
    unusual_talents:string[]
    ununusual_talents:string[]
}

export interface Profession extends DefaultFrameworkData{
    ap_cost:number
    language_ap_bank:number
    ususal_advantages:string[]
    usual_disadvantages:string[]
    unususal_advantages:string[]
    unusual_disadvantages:string[]
}

interface Extension{
    min_fw:number
    api_cost:number
}

export interface SupernaturalAbility extends DefaultFrameworkData{
    check:string[]
    ignore_check:boolean
    difficulty_modifier:string | undefined
    asp_cost:number | undefined
    kap_cost:number | undefined
    ticking_cost:boolean
    cost_multiplication:boolean
    leveling_factor:string
    extensions:Extension[]
}

export interface MagicalSong extends SupernaturalAbility{
    base_talent:string[]
}