/**
 * Functional programming styled removal property from object
 * Usage: deleteProperty(originalObject: object, keyToRemove: string | number): object
 *
 * @param {string | number} keyToRemove
 * @returns {object}
 */
// eslint-disable-next-line no-use-before-define
export const deleteProperty = ({ [keyToRemove]: _, ...newObj }, keyToRemove) =>
  newObj;
