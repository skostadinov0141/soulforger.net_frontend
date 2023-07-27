export interface Stat{
    default: number;
    current: number;
}

export interface IBaseStats {
    lifePoints: Stat; 
    strength: Stat;
    acrobatics: Stat;
    preception: Stat;
    charisma: Stat;
    will: Stat;
    connection: Stat;
    motivation: Stat;
    lsx: number;
    sax: number;
    apx: number;
    pcx: number;
    cwx: number;
    wcx: number;
}

export class BaseStats implements IBaseStats{
    lifePoints: Stat = {default: 0, current: 0};
    strength: Stat = {default: 0, current: 0};
    acrobatics: Stat = {default: 0, current: 0};
    preception: Stat = {default: 0, current: 0};
    charisma: Stat = {default: 0, current: 0};
    will: Stat = {default: 0, current: 0};
    connection: Stat = {default: 0, current: 0};
    motivation: Stat = {default: 0, current: 0};
    lsx: number = 0;
    sax: number = 0;
    apx: number = 0;
    pcx: number = 0;
    cwx: number = 0;
    wcx: number = 0;
}