import IModifier from "../nirve_character/IModifier";
import IRequirement from "../nirve_character/IRequirement";

export interface IBenderStats {
	maxMass: number;
	maxDistance: number;
	maxArea: number;
	benderSkills: IBenderSkill[];
}

export interface IBenderSkill {
	name: string;
	effect: string;
}

// export interface IBenderSkill {
//     name: string;
//     effect: string;
//     xpCost: number;
//     requirements: IRequirement[];
// }

export class BenderStats implements IBenderStats {
	maxMass: number = 0;
	maxDistance: number = 0;
	maxArea: number = 0;
	benderSkills: IBenderSkill[] = [];

	public get(searchTerm: string): IBenderSkill | false | number {
		switch (searchTerm) {
			case "maxMass":
				return this.maxMass;
			case "maxDistance":
				return this.maxDistance;
			case "maxArea":
				return this.maxArea;
			default:
				let searchResult = this.benderSkills.find((skill: IBenderSkill) => {
					if (skill.name === searchTerm) {
						return skill;
					}
				});
				if (searchResult) {
					return searchResult;
				}
				return false;
		}
	}

	public set(searchTerm: string, value: number | IBenderSkill): boolean {
		switch (searchTerm) {
			case "maxMass":
				this.maxMass = value as number;
				return true;
			case "maxDistance":
				this.maxDistance = value as number;
				return true;
			case "maxArea":
				this.maxArea = value as number;
				return true;
			default:
				let searchResult = this.benderSkills.find((skill: IBenderSkill) => {
					if (skill.name === searchTerm) {
						searchResult = skill;
						this.benderSkills[this.benderSkills.indexOf(skill)] =
							value as IBenderSkill;
					}
				});
				if (!searchResult) {
					return false;
				}
				return true;
		}
	}
}
