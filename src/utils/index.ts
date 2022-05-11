export const executeByKey = <T>({
  entity,
  callbackFn,
  propertiesToExclude = [],
}: {
  entity: T;
  callbackFn: any;
  propertiesToExclude?: string[];
}) => {
  (Object.keys(entity) as Array<keyof T>).forEach(key => {
    if (propertiesToExclude.find(element => element !== String(key))) callbackFn(key, entity[key]);
  });
};

export function filterByKey(objArray: any, keyFilter: string): string[] {
  return objArray.map((obj: any) => obj[keyFilter]).filter((element: any) => element !== undefined);
}

export const entityHasProperty = <T>({
  entity,
  propertiesToFilter,
}: {
  entity: T;
  propertiesToFilter: string[];
}): boolean => {
  let returnValue: boolean = false;
  (Object.keys(entity) as Array<keyof T>).forEach(key => {
    if (propertiesToFilter.find(element => element === String(key))) returnValue = true;
  });
  return returnValue;
};

export const getByKey = (collection: any, value: any, key = 'id') => {
  if (!collection || !value) return null;

  const item = collection.filter((item: any) => item[key].toString() === value.toString());
  if (item) return item[0];
  return null;
};

export const fullName = (user: any) => user.firstName + ' ' + user.lastName;

const contains = (needle: any, haystack: any) => new RegExp(needle, 'i').test(haystack);

export const textFilter = (text: string, collection: any, cols: any) =>
  collection.filter((s: any) => {
    for (let i = 0; i < cols.length; i++) {
      if (contains(text, s[cols[i]] || '')) {
        return true;
      }
    }
    return false;
  });

export const removeMask = (e: any, name: any, onChange: any) => {
  const removePoint = e.target.value.split('.').join('');
  const removeDash = removePoint.split('-').join('');
  const result = removeDash.split('_').join('');
  onChange(name, result);
};

export const removeMaskPhone = (e: any, name: any, onChange: any) => {
  const removecharacter1 = e.target.value.split('(').join('');
  const removecharacter2 = removecharacter1.split(')').join('');
  const removecharacter3 = removecharacter2.split('_').join('');
  const removecharacter4 = removecharacter3.split('+').join('');
  const removespace = removecharacter4.split(' ').join('');
  const result = removespace.split('-').join('');
  onChange(name, result);
};

export const dataURLtoFile = (dataurl: any, filename?: any) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1; // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime });
};
