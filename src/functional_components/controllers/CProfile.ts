import {
	Exclude,
	Expose,
	Type,
	plainToClassFromExist,
} from "class-transformer";
import API from "../API/api";
import { BaseController } from "./_BaseController";

export class CProfile extends BaseController {
	display_name: string;
	bio: string;
	profile_picture: string;
	preferred_role: string;
	preferred_games: string[];
	badges: Badge[];
	owner: string;

	patch() {
		this.api!.getAxios().patch("/profile", this);
	}
}

class Badge {
	name: string;
	description: string;
	color: string;
	style: string;
}
