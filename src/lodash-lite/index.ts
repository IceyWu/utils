import cloneDeep from 'lodash/cloneDeep'
import fromPairs from 'lodash/fromPairs'
import sortBy from 'lodash/sortBy'
import toPairs from 'lodash/toPairs'
import isEqualWith from 'lodash/isEqualWith'

/**
 * Sorts an object by its keys
 * @param obj Object to sort
 * @returns Sorted object
 */
export function sortObj(obj: Record<string, any>): Record<string, any> {
  const sortedObj = fromPairs(sortBy(toPairs(obj), ([key]: [string, any]) => key))
  return sortedObj
}

/**
 * 深拷贝
 * @param data
 * @returns deep clone value
 */
export function deepClone(data: Record<string, any>): Record<string, any> {
  return cloneDeep(data)
}

/**
 * @description 返回两对象中变化过的数据
 * @param oldVal 旧对象
 * @param newVal 新对象
 * @returns { differences } differences:变化过的数据
 */
export function compareObjects(oldVal: any, newVal: any): any {
  const differences: any = {}
  Object.keys(newVal).forEach((key) => {
    if (!isEqualWith(newVal[key], oldVal[key]))
      differences[key] = newVal[key]
  })
  return differences
}
