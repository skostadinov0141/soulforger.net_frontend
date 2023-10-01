interface Operation {
	operator: "lt" | "gt" | "gte" | "in" | "lte" | "ne" | "nin" | "exists";
	value:
		| string
		| number
		| boolean
		| Date
		| string[]
		| number[]
		| boolean[]
		| Date[];
}

export default class Query {
	field: string;
	operations: Operation[];

	constructor(field: string, operations: Operation[] = []) {
		this.field = field;
		this.operations = operations;
	}

	toString(): string {
		const queryParts: string[] = [];
		this.operations.forEach((operation) => {
			queryParts.push(
				`{ "${this.field}": { "$${operation.operator}": ${JSON.stringify(
					operation.value
				)} } }`
			);
		});
		return JSON.stringify({ $and: queryParts });
	}
}
