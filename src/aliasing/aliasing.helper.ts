import { zip, index } from '../utility/array';

export const renameProperties = (attribs, renames, target) => {
  const aliases = zip(attribs, renames).reduce(
    (aliases, [attr, alias]) => (
      { ...aliases, [alias]: index(target, attr) }
    ), {}
  )

  target = { ...target, ...aliases }
  attribs.map((attr) => delete target[attr.split('.')[0]])

  return target
}
