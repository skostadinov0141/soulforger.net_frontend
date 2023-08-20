export function isEmail(value: string) {
	if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
		return true;
	}
	return "Keine gültige E-Mail";
}

export function containsNumber(value: string) {
	if (value.match(/[0-9]/)) {
		return true;
	}
	return "Muss eine Zahl enthalten";
}

export function containsSpecialCharacter(value: string) {
	if (value.match(/[^a-zA-Z0-9]/)) {
		return true;
	}
	return "Muss ein Sonderzeichen enthalten";
}

export function containsUppercase(value: string) {
	if (value.match(/[A-Z]/)) {
		return true;
	}
	return "Muss einen Großbuchstaben enthalten";
}

export function containsLowercase(value: string) {
	if (value.match(/[a-z]/)) {
		return true;
	}
	return "Muss einen Kleinbuchstaben enthalten";
}

export function min(value: string, length: number) {
	if (value.length >= length) {
		return true;
	}
	return "Muss mindestens " + length + " Zeichen lang sein";
}

export function max(value: string, length: number) {
	if (value.length <= length) {
		return true;
	}
	return "Darf maximal " + length + " Zeichen lang sein";
}

export function required(value: string) {
	if (value) {
		return true;
	}
	return "Feld darf nicht leer sein";
}

export function matches(value: string, value2: string) {
	if (value === value2) {
		return true;
	}
	return "Felder müssen übereinstimmen";
}
