import { Exclude } from "class-transformer";
import API from "../API/api";

export class BaseController {
	@Exclude()
	api?: API;

	setApi(api: API) {
		this.api = api;
	}
}
