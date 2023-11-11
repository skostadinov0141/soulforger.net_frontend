export function getProperty(object: any, path: string): any {
  const properties = path.split(".");
  let value = object;
  for (const prop of properties) {
    if (isNaN(Number(prop))) {
      value = value[prop];
    } else {
      value = value[Number(prop)];
    }
    if (value === undefined) {
      break;
    }
  }
  return value;
}

export function setProperty(object: any, path: string, value: any) {
  const properties = path.split(".");
  let target = object;
  for (let i = 0; i < properties.length - 1; i++) {
    const prop = properties[i];
    if (isNaN(Number(prop))) {
      target = target[prop];
    } else {
      target = target[Number(prop)];
    }
    if (target === undefined) {
      break;
    }
  }
  if (target !== undefined) {
    target[properties[properties.length - 1]] = value;
  }
}
