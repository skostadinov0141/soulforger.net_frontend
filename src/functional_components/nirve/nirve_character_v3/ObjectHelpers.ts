export function getProperty(object: any, path: string[]): any {
    const properties = path;
    let value = object;
    for (const prop of properties) {
        value = value[prop];
        if (value === undefined) {
        break;
    }
}
return value;
}

export function setProperty(object: any, path: string[], value: any) {
    const properties = path;
    let target = object;
    for (let i = 0; i < properties.length - 1; i++) {
        const prop = properties[i];
        target = target[prop];
        if (target === undefined) {
        break;
        }
    }
    if (target !== undefined) {
        target[properties[properties.length - 1]] = value;
    }
}
  