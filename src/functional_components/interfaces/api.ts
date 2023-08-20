import { Transform, Type } from "class-transformer";

export class AuthResult {
	access_token: string;
	exp: string;
	token_type: string;
}
