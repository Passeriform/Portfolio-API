export const zip = (...arrays) => arrays[0].map(
  (_, i) => arrays.map(
    (array) => array[i]
  )
);
