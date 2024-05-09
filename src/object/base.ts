import get from 'lodash/get'
import set from 'lodash/set'
import { isArray, isDate, isEmpty, isObject, isRegExp } from '../is'
import type { DeepPartial } from '../types'

/**
 * A deep clone method to ensure that circular references are avoided.
 * 一个深度克隆方法来保证避免循环引用
 *
 * @category Object
 *
 * @param origin any complex type of object
 * @param hash hashMap
 * @returns a deep clone object
 */
export function deepClone2(origin: any, hash = new WeakMap()): any {
  if (isObject(origin)) {
    if (hash.has(origin))
      return hash.get(origin)

    const target: any = isArray(origin) ? [] : {}
    hash.set(origin, target)

    Object.entries(origin).forEach(([k, v]: [string, any]) => {
      if (isRegExp(v))
        target[k] = new RegExp(v)
      else if (isDate(v))
        target[k] = new Date(v)
      else target[k] = deepClone2(v, hash)
    })
    return target
  }
  return origin
}

/**
 * extend Fn equal `Object.assign`
 * @category Object
 */
export const extend = Object.assign

const hasOwnProperty = Object.prototype.hasOwnProperty
/**
 * Object.prototype.hasOwnProperty
 * @category Object
 */
export function hasOwn(
  val: object,
  key: string | symbol,
): key is keyof typeof val {
  if (val == null)
    return false
  return hasOwnProperty.call(val, key)
}

/**
 * Deep merge two objects
 * 深度合并两个对象
 *
 * @category Object
 * @returns merged object
 */
export function deepMerge<T>(original: T, patch: DeepPartial<T>): T {
  const o = original as any
  const p = patch as any

  if (isArray(o) && isArray(p))
    return [...o, ...p] as any

  if (isArray(o))
    return [...o] as any

  const output = { ...o }
  if (isObject(o) && isObject(p)) {
    Object.keys(p).forEach((key) => {
      if (isObject(p[key])) {
        if (!(key in o))
          Object.assign(output, { [key]: p[key] })
        else output[key] = deepMerge(o[key], p[key])
      }
      else {
        Object.assign(output, { [key]: p[key] })
      }
    })
  }
  return output
}

/**
 * Check if an object has a key
 * 检查对象是否有某个键
 * @param obj 对象
 * @param keys 键
 * @returns boolean
 */
export function hasKey(obj: any, keys: string | string[]): boolean {
  if (Array.isArray(keys)) {
    let temp = obj
    for (let i = 0; i < keys.length; i++) {
      if (hasOwn(temp, keys[i]))
        temp = temp[keys[i]]
      else return false
    }
    return true
  }
  else {
    return hasOwn(obj, keys)
  }
}
/**
 * Set object value
 * 对象复值
 * @param obj 对象
 * @param keys 键
 * @returns Object
 */
export function setObjValue(
  obj: any,
  keys: string | string[],
  value: any,
): any {
  return set(obj, keys, value)
}
/**
 * @description 获取对象属性
 * @param data 对象
 * @param path 属性路径 支持数组 ['a', 'b', 'c'] 或字符串 'a'
 * @returns { any } any:属性值
 */
export function getObjVal(data: any, path: string | string[]) {
  return get(data, path)
}

/**
 * Remove empty values from objects, including empty arrays
 * 去除对象中的空值，包括空数组
 *
 * @param obj 对象
 * @param exclude 排除的字段
 * @returns merged object
 */
export interface excludeOptions {
  vals?: any[]
  keys?: string[]
}
export function removeEmptyValues(obj: any, exclude?: excludeOptions) {
  if (typeof obj !== 'object')
    return obj
  if (Array.isArray(obj))
    return obj.filter(item => !isEmpty(item))
  const result: any = {}
  const { vals = [], keys = [] } = exclude ?? ({} as excludeOptions)
  Object.entries(obj).forEach(([key, value]) => {
    const val: any = value
    if (vals.includes(value))
      result[key] = val
    else if (!isEmpty(val))
      result[key] = removeEmptyValues(val, exclude)
  })
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i]
    if (hasKey(obj, k)) {
      const valT = getObjVal(obj, k)
      setObjValue(result, k, valT)
    }
  }

  return result
}

export default {
  // deepClone,
  deepClone2,
  deepMerge,
  extend,
  hasOwn,
  removeEmptyValues,
  hasKey,
  setObjValue,
  getObjVal,
}
