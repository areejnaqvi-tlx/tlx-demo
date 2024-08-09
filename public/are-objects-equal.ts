/**
 * For deep comparison between two objects.
 * @param obj1
 * @param obj2
 */
export const AreObjectsEqual = (object1: any, object2: any): boolean => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  const isObject = (object: any) => {
    return object != null && typeof object === 'object';
  };
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !AreObjectsEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};

export default AreObjectsEqual;
