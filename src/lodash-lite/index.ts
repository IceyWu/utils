import cloneDeep from 'lodash/cloneDeep'
import fromPairs from 'lodash/fromPairs'
import sortBy from 'lodash/sortBy'
import toPairs from 'lodash/toPairs'

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
