import cloneDeep from 'lodash/cloneDeep'
import fromPairs from 'lodash/fromPairs'
import sortBy from 'lodash/sortBy'
import toPairs from 'lodash/toPairs'
import isEqualWith from 'lodash/isEqualWith'

/**
 * @description Sorts an object by its keys(对象排序)
 * @param obj Object to sort(需要排序的对象)
 * @returns { sortedObj } sortedObj:排序后的对象
 * @category LodashLite
 * @example
 * ```
 *
 *  const tempData = {
 *  a: { a: 1, c: 2 },
 *  c: 123,
 *  f: 2,
 *  s: "123",
 *  e: 0,
 *  b: 3,
 * };
 *  const newList = sortObj(tempData);
 * // {"a": {"a": 1,"c": 2},"b": 3,"c": 123,"e": 0,"f": 2,"s": "123"}
 *
 * ```
 */
export function sortObj(obj: Record<string, any>): Record<string, any> {
  const sortedObj = fromPairs(sortBy(toPairs(obj), ([key]: [string, any]) => key))
  return sortedObj
}

/**
 * @description deep clone value(深拷贝)
 * @param data value
 * @returns { data } data:深拷贝后的值
 * @category LodashLite
 * @example
 * ```
 *
 *  const tempData = {
 *  a: { a: 1, c: 2 },
 *  c: 123,
 *  f: 2,
 *  s: "123",
 *  e: 0,
 *  b: 3,
 * };
 *  const newList = sortObj(tempData);
 *  // {"a": {"a": 1,"c": 2},"c": 123,"f": 2,"s": "123","e": 0,"b": 3}
 *
 * ```
 */
export function deepClone(data: Record<string, any>): Record<string, any> {
  return cloneDeep(data)
}

/**
 * @description 返回两对象中变化过的数据
 * @param oldVal 旧对象
 * @param newVal 新对象
 * @returns { differences } differences:变化过的数据
 * @category LodashLite
 * @example
 * ```
 *
 * const tempData = {
 *  a: { a: 1, c: 2 },
 *  c: 10,
 * };
 * const oldtempData = {
 *  a: { a: 1, c: 3 },
 *  b: 20,
 * };
 * const newList = compareObjects(tempData, oldtempData);
 * // {"a": {"a": 1,"c": 3},"b": 20}
 *
 * ```
 *
 */
export function compareObjects(oldVal: any, newVal: any): any {
  const differences: any = {}
  Object.keys(newVal).forEach((key) => {
    if (!isEqualWith(newVal[key], oldVal[key]))
      differences[key] = newVal[key]
  })
  return differences
}
