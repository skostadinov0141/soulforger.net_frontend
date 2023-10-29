import { type } from "os";

export default class QueryConstructor {
	constructor() {}
}

export class EqualsQuery {
	value: string;

	constructor(value: string) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$eq: this.value,
		});
	}
}

export class NotEqualsQuery {
	value: string;

	constructor(value: string) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$ne: this.value,
		});
	}
}

export class GreaterThanQuery {
	value: string;

	constructor(value: string) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$gt: this.value,
		});
	}
}

export class GreaterThanOrEqualsQuery {
	value: string;

	constructor(value: string) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$gte: this.value,
		});
	}
}

export class LessThanQuery {
	value: string;

	constructor(value: string) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$lt: this.value,
		});
	}
}

export class LessThanOrEqualsQuery {
	value: string;

	constructor(value: string) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$lte: this.value,
		});
	}
}

export class InQuery {
	value: string[];

	constructor(value: any[]) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$in: this.value,
		});
	}
}

export class NotInQuery {
	value: string[];

	constructor(value: any[]) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$nin: this.value,
		});
	}
}

export class AndQuery {
	value: (
		| EqualsQuery
		| NotEqualsQuery
		| GreaterThanOrEqualsQuery
		| LessThanQuery
		| LessThanOrEqualsQuery
		| InQuery
		| NotInQuery
		| AndQuery
		| OrQuery
		| NorQuery
		| NotQuery
		| ExistQuery
	)[];

	constructor(
		value: (
			| EqualsQuery
			| NotEqualsQuery
			| GreaterThanOrEqualsQuery
			| LessThanQuery
			| LessThanOrEqualsQuery
			| InQuery
			| NotInQuery
			| AndQuery
			| OrQuery
			| NorQuery
			| NotQuery
			| ExistQuery
		)[]
	) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$and: this.value.map((query) => query.parse()),
		});
	}
}

export class OrQuery {
	value: (
		| EqualsQuery
		| NotEqualsQuery
		| GreaterThanOrEqualsQuery
		| LessThanQuery
		| LessThanOrEqualsQuery
		| InQuery
		| NotInQuery
		| AndQuery
		| OrQuery
		| NorQuery
		| NotQuery
		| ExistQuery
	)[];

	constructor(
		value: (
			| EqualsQuery
			| NotEqualsQuery
			| GreaterThanOrEqualsQuery
			| LessThanQuery
			| LessThanOrEqualsQuery
			| InQuery
			| NotInQuery
			| AndQuery
			| OrQuery
			| NorQuery
			| NotQuery
			| ExistQuery
		)[]
	) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$or: this.value.map((query) => query.parse()),
		});
	}
}

export class NorQuery {
	value: (
		| EqualsQuery
		| NotEqualsQuery
		| GreaterThanOrEqualsQuery
		| LessThanQuery
		| LessThanOrEqualsQuery
		| InQuery
		| NotInQuery
		| AndQuery
		| OrQuery
		| NorQuery
		| NotQuery
		| ExistQuery
	)[];

	constructor(
		value: (
			| EqualsQuery
			| NotEqualsQuery
			| GreaterThanOrEqualsQuery
			| LessThanQuery
			| LessThanOrEqualsQuery
			| InQuery
			| NotInQuery
			| AndQuery
			| OrQuery
			| NorQuery
			| NotQuery
			| ExistQuery
		)[]
	) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$nor: this.value.map((query) => query.parse()),
		});
	}
}

export class NotQuery {
	value: (
		| EqualsQuery
		| NotEqualsQuery
		| GreaterThanOrEqualsQuery
		| LessThanQuery
		| LessThanOrEqualsQuery
		| InQuery
		| NotInQuery
		| AndQuery
		| OrQuery
		| NorQuery
		| NotQuery
		| ExistQuery
	)[];

	constructor(
		value: (
			| EqualsQuery
			| NotEqualsQuery
			| GreaterThanOrEqualsQuery
			| LessThanQuery
			| LessThanOrEqualsQuery
			| InQuery
			| NotInQuery
			| AndQuery
			| OrQuery
			| NorQuery
			| NotQuery
			| ExistQuery
		)[]
	) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$not: this.value.map((query) => query.parse()),
		});
	}
}

export class ExistQuery {
	value: boolean;

	constructor(value: boolean) {
		this.value = value;
	}

	parse(): string {
		return JSON.stringify({
			$exists: this.value,
		});
	}
}

type ComparisonQuery =
	| EqualsQuery
	| NotEqualsQuery
	| GreaterThanQuery
	| GreaterThanOrEqualsQuery
	| LessThanQuery
	| LessThanOrEqualsQuery
	| InQuery
	| NotInQuery
	| ExistQuery;

type LogicalQuery = AndQuery | OrQuery | NorQuery | NotQuery | ExistQuery;

export type Queries = ComparisonQuery | LogicalQuery;
