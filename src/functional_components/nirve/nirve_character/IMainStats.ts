export interface Stat{
    max: number;
    current: number;
}

export default interface IMainStats {
    lifePoints: Stat; 
    strength: Stat;
    acrobatics: Stat;
    perception: Stat;
    charisma: Stat;
    will: Stat;
    connection: Stat;
    motivation: Stat;
    lsx: Stat;
    sax: Stat;
    apx: Stat;
    pcx: Stat;
    cwx: Stat;
    wcx: Stat;
}