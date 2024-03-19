import { isFunction } from '../is'

/**
 * @description 返回数组不同的值
 * @param array (Array): 要检查的数组。
 * @returns [values] (...Array): 排除的值。
 */
export function diff<T>(root: readonly T[], other: readonly T[], identity: (item: T) => string | number | symbol = (t: T) =>
  t as unknown as string | number | symbol): T[] {
  if (!root?.length && !other?.length)
    return []
  if (root?.length === undefined)
    return [...other]
  if (!other?.length)
    return [...root]
  const bKeys = other.reduce((acc, item) => {
    acc[identity(item)] = true
    return acc
  }, {} as Record<string | number | symbol, boolean>)
  return root.filter(a => !bKeys[identity(a)])
}

/**
 * @description 数组扁平化（Given an array of arrays, returns a single dimentional array with all items in it.）
 * @param lists (Array): 要扁平化的数组。
 * @returns newList: 要扁平化后数组
 */
export function flat<T>(lists: readonly T[][]): T[] {
  return lists.reduce((acc, list) => {
    acc.push(...list)
    return acc
  }, [])
}

/**
 * @description 快速创建数组 （Creates a list of given start, end, value, and step parameters.)
 * @param startOrLength  开始值或者长度
 * @param end  结束值
 * @param valueOrMapper  指定值或方法
 * @returns Array 生成好的值
 * @example
 * list(3)                  // 0, 1, 2, 3
 * list(0, 3)               // 0, 1, 2, 3
 * list(0, 3, 'y')          // y, y, y, y
 * list(0, 3, () => 'y')    // y, y, y, y
 * list(0, 3, i => i)       // 0, 1, 2, 3
 * list(0, 3, i => `y${i}`) // y0, y1, y2, y3
 * list(0, 3, obj)          // obj, obj, obj, obj
 * list(0, 6, i => i, 2)    // 0, 2, 4, 6
 */
export function list<T = number>(startOrLength: number, end?: number, valueOrMapper?: T | ((i: number) => T), step?: number): T[] {
  return Array.from(range(startOrLength, end, valueOrMapper, step))
}

/**
 * Creates a generator that will produce an iteration through
 * the range of number as requested.
 *
 * @example
 * range(3)                  // yields 0, 1, 2, 3
 * range(0, 3)               // yields 0, 1, 2, 3
 * range(0, 3, 'y')          // yields y, y, y, y
 * range(0, 3, () => 'y')    // yields y, y, y, y
 * range(0, 3, i => i)       // yields 0, 1, 2, 3
 * range(0, 3, i => `y${i}`) // yields y0, y1, y2, y3
 * range(0, 3, obj)          // yields obj, obj, obj, obj
 * range(0, 6, i => i, 2)    // yields 0, 2, 4, 6
 */
export function* range<T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper: T | ((i: number) => T) = i => i as T,
  step: number = 1,
): Generator<T> {
  const mapper = isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper
  const start = end ? startOrLength : 0
  const final = end ?? startOrLength
  for (let i = start; i <= final; i += step) {
    yield mapper(i)
    if (i + step > final)
      break
  }
}

type Falsy = null | undefined | false | '' | 0 | 0n
/**
 * @description 排除数组的假值 （Given a list returns a new list with only truthy values)
 * @param list  被处理的数组
 * @returns Array 处理好的数组
 * @example
 * sift(['salmon', null, false, NaN, 'sockeye', 'bass'] ) // => ['salmon', 'sockeye', 'bass']
 */
export function sift<T>(list: readonly (T | Falsy)[]): T[] {
  return (list?.filter(x => !!x) as T[]) ?? []
}