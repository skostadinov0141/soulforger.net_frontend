export interface Stat {
	default: number;
	current: number;
}

export interface IMainStats {
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

export class MainStats implements IMainStats {
	lifePoints: Stat = { default: 0, current: 0 };
	strength: Stat = { default: 0, current: 0 };
	acrobatics: Stat = { default: 0, current: 0 };
	perception: Stat = { default: 0, current: 0 };
	charisma: Stat = { default: 0, current: 0 };
	will: Stat = { default: 0, current: 0 };
	connection: Stat = { default: 0, current: 0 };
	motivation: Stat = { default: 0, current: 0 };
	lsx: Stat = { default: 0, current: 0 };
	sax: Stat = { default: 0, current: 0 };
	apx: Stat = { default: 0, current: 0 };
	pcx: Stat = { default: 0, current: 0 };
	cwx: Stat = { default: 0, current: 0 };
	wcx: Stat = { default: 0, current: 0 };

	public get(searchTerm: string): Stat | false {
		switch (searchTerm) {
			case "lifePoints":
				return this.lifePoints;
			case "strength":
				return this.strength;
			case "acrobatics":
				return this.acrobatics;
			case "perception":
				return this.perception;
			case "charisma":
				return this.charisma;
			case "will":
				return this.will;
			case "connection":
				return this.connection;
			case "motivation":
				return this.motivation;
			case "lsx":
				return this.lsx;
			case "sax":
				return this.sax;
			case "apx":
				return this.apx;
			case "pcx":
				return this.pcx;
			case "cwx":
				return this.cwx;
			case "wcx":
				return this.wcx;
			default:
				return false;
		}
	}

	public set(searchTerm: string, value: Stat): boolean {
		switch (searchTerm) {
			case "lifePoints":
				this.lifePoints = value;
				return true;
			case "strength":
				this.strength = value;
				return true;
			case "acrobatics":
				this.acrobatics = value;
				return true;
			case "perception":
				this.perception = value;
				return true;
			case "charisma":
				this.charisma = value;
				return true;
			case "will":
				this.will = value;
				return true;
			case "connection":
				this.connection = value;
				return true;
			case "motivation":
				this.motivation = value;
				return true;
			case "lsx":
				this.lsx = value;
				return true;
			case "sax":
				this.sax = value;
				return true;
			case "apx":
				this.apx = value;
				return true;
			case "pcx":
				this.pcx = value;
				return true;
			case "cwx":
				this.cwx = value;
				return true;
			case "wcx":
				this.wcx = value;
				return true;
			default:
				return false;
		}
	}
}
