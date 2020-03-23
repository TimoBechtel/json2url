const serialize = (
  object,
  {
    objectPrefix = '=',
    objectPostfix = '+',
    separator = '&',
    encoder = encodeURIComponent,
  } = {}
) => {
  const escapeRegEx = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const prefixEscaped = escapeRegEx(objectPrefix);
  const postfixEscaped = escapeRegEx(objectPostfix);
  const separatorEscaped = escapeRegEx(separator);
  if (typeof object === 'string') object = JSON.parse(object);
  const string = Object.values(object)
    .map(function encodeValues(value) {
      if (value && typeof value === 'object') {
        return (
          objectPrefix +
          Object.values(value)
            .map(encodeValues)
            .join(separator) +
          objectPostfix
        );
      }
      value = encoder(value);
      if (
        value.match(
          `(${postfixEscaped})|(${prefixEscaped})|(${separatorEscaped})`
        )
      )
        throw `Defined postfix, prefix or separator exists in source! (value: ${value})`;
      return value;
    })
    .join(separator)
    .replace(
      // last postfixes are not needed
      new RegExp(`${postfixEscaped}+$`),
      ''
    )
    .replace(
      // prefix / postfix can act as sole separator
      new RegExp(`${separatorEscaped}${prefixEscaped}`, 'g'),
      objectPrefix
    )
    .replace(
      new RegExp(`${postfixEscaped}${separatorEscaped}`, 'g'),
      objectPostfix
    );
  return string;
};
const deserialize = (
  string,
  template,
  {
    objectPrefix = '=',
    objectPostfix = '+',
    separator = '&',
    decoder = decodeURIComponent,
  } = {}
) => {
  let arrays = [[]];
  let curArray = arrays[0];
  let curValue = '';
  for (const c of string) {
    if (c === separator) {
      curArray.push(decoder(curValue));
      curValue = '';
      continue;
    }
    if (c === objectPrefix) {
      if (curValue !== '') curArray.push(decoder(curValue));
      curValue = '';
      curArray = [];
      arrays.push(curArray);
      continue;
    }
    if (c === objectPostfix) {
      if (curValue !== '') curArray.push(decoder(curValue));
      curValue = '';
      arrays.pop();
      arrays[arrays.length - 1].push(curArray);
      curArray = arrays[arrays.length - 1];
      continue;
    }
    curValue += c;
  }
  // if last objectPostfixes are missing
  if (curValue) curArray.push(decoder(curValue));

  while (arrays.length > 1) arrays[arrays.length - 2].push(arrays.pop());

  // remove outer array
  arrays = arrays[0];

  if (template) {
    let object;
    if (Array.isArray(template)) object = [...template];
    else object = { ...template };
    const mapValuesToObject = (object, array) => {
      Object.entries(object).forEach(([key, value], i) => {
        if (value && typeof value === 'object') {
          mapValuesToObject(value, array[i]);
          return;
        }

        object[key] = array[i];
        if (typeof value === 'number') object[key] = parseFloat(array[i]) || 0;
        else if (typeof value === 'boolean') object[key] = array[i] === 'true';
      });
    };
    mapValuesToObject(object, arrays);
    return object;
  }

  return arrays;
};

export default {
  serialize,
  deserialize,
};
