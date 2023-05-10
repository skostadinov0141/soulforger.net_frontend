
export interface ValidationResponse{
    result:boolean
    problems:string[]
    modifiers:undefined
}

export interface StatValidation{
    validations:{
        id:string,
        min_lvl:number
    }[]
    operator:string
    count:number
}

export interface TalentValidation{
    validations:{
        id:string
        min_fw:number
    }[]
    operator:string
    count:number
}

export interface SkillValidation{
    validations:{
        id:string
        sub_categories:string[]
        min_lvl:number
    }[]
    include:boolean
    operator:string
    count:number
}