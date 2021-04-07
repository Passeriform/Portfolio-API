export const zip = (...arrays) => arrays[0].map(
  (_, i) => arrays.map(
    (array) => array[i]
  )
);

export const index = (obj, is, value?) => {
  // Initial split on accessor strings
  if (typeof is == 'string')
    return index(obj, is.split('.'), value);

  // Setter mode resolution
  if (is.length == 1 && value !== undefined)
    return obj[is[0]] = value;
  // Default getter mode resolution
  else if (is.length == 0)
    return obj;

  // Recursion loop
  return index(obj ?.[is[0]] ?? "", is.slice(1), value);
}
