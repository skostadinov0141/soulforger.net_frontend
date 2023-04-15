export interface DSACharacter {
    name: string
    level: string
    family: string
    birth_date: string
    species: string
    culture: string
    profession: string
    age: number
    sex: string
    height: number
    primary_attributes: PrimaryAttributes
    secondary_attributes: SecondaryAttributes
    talents: Talent[]
    combat_skills: Array<CombatSkill>
    close_range_weapons: CloseRangeWeapons
    long_range_weapons: LongRangeWeapons
    armor: Armor
    status_effects: StatusEffects
    funds: Funds
  }
  
  export interface PrimaryAttributes {
    MU: number
    KL: number
    IN: number
    CH: number
    FF: number
    GE: number
    KO: number
    KK: number
  }
  
  export interface SecondaryAttributes {
    LEP: Lep
    ASP: Asp
    KAP: Kap
    SK: Sk
    ZK: Zk
    AW: Aw
    INI: Ini
    GES: Ges
    WS: Ws
  }
  
  export interface Lep {
    current: number
    max: number
  }
  
  export interface Asp {
    current: number
    max: number
  }
  
  export interface Kap {
    current: number
    max: number
  }
  
  export interface Sk {
    current: number
    max: number
  }
  
  export interface Zk {
    current: number
    max: number
  }
  
  export interface Aw {
    current: number
    max: number
  }
  
  export interface Ini {
    current: number
    max: number
  }
  
  export interface Ges {
    current: number
    max: number
  }
  
  export interface Ws {
    current: number
    max: number
  }
  
  export interface Talent {
    name: string
    category: string
    fw: number
    att_1: string
    att_2: string
    att_3: string
  }
  
  export interface CombatSkill {
    name: string
    lf: string
    at: number
    pa: number
  }
  
  export interface CloseRangeWeapons {}
  
  export interface LongRangeWeapons {}
  
  export interface Armor {}
  
  export interface StatusEffects {}
  
  export interface Funds {
    d: number
    s: number
    h: number
    k: number
  }
  