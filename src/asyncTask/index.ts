import type { Awaitable } from '../types'
import { getObjVal } from '../object'
import { isArray } from '../is'

interface Rules {
  keys: string | string[]
  val: any
}
export interface GetAsyncTaskOptions {
  rules?: Rules[]
  params?: any
  asyncTime?: number
  maxTimes?: number
}

export interface GetAsyncTaskReturn {
  task: Promise<any>
  stop: () => void
}

/**
 * @description 异步任务
 * @param request 请求函数
 * @param option 选项 rules:判断条件 params:请求参数 asyncTime:异步时间 maxTimes:最大次数
 * @returns { task, stop } task:异步任务 stop:停止异步任务
 * @example
 * ```
 * // rules:判断条件
 * // 1.请求接口放回数据后，判断返回数据中code为200，且data.complete为true
 * // {
 * //  code: 200,
 * //  data: {
 * //	  complete: true
 * //  }
 * // }
 * 	  const rules = [
 *      {
 *         keys: "code",
 *         val: 200,
 *      },
 *      {
 *         keys: ["data", "complete"],
 *         val: true,
 *      }
 *    ];
 *    const params = {};
 *    const { task } = getAsyncTask(asyncTaskApi, { rules, params });
 * 
 * ```
 */
export function getAsyncTask(request: Awaitable<any>, option: GetAsyncTaskOptions): GetAsyncTaskReturn {
  let timer: string | number | NodeJS.Timeout | undefined
  let index = 0
  let stopFlag = false
  const { rules = [], params, asyncTime = 1000, maxTimes = -1 } = option

  const task = new Promise((resolve) => {
    const getAsyncTask = async () => {
      const res = await request(params)
      if (!res)
        return res
      const isComplete = rules.every(({ keys, val }) => getObjVal(res, keys) === val)
      if (isComplete || (maxTimes >= 0 && index > maxTimes) || stopFlag) {
        clearTimeout(timer)
        resolve(res)
      }
      else {
        index++
        timer = setTimeout(() => {
          getAsyncTask()
        }, asyncTime)
      }
    }
    getAsyncTask()
  })
  return {
    task,
    stop() {
      stopFlag = true
    },
  }
}

type PromiseValues<T extends Promise<any>[]> = {
  [K in keyof T]: T[K] extends Promise<infer U> ? U : never
}
export class AggregateError extends Error {
  errors: Error[]
  constructor(errors: Error[] = []) {
    super()
    const name = errors.find(e => e.name)?.name || ''
    this.name = `AggregateError(${name}...)`
    this.message = `AggregateError with ${errors.length} errors`
    this.stack = errors.find(e => e.stack)?.stack || this.stack
    this.errors = errors
  }
}
/**
 * Functionally similar to Promise.all or Promise.allSettled. If any
 * errors are thrown, all errors are gathered and thrown in an
 * AggregateError.
 * @description like Promise.all or Promise.allSettled functions
 * @param promises promise 列表
 * @returns res
 * @example
 * const { user } = await all({
 *   user: api.users.create(...),
 *   bucket: s3.buckets.create(...),
 *   message: slack.customerSuccessChannel.sendMessage(...)
 * })
 */
export async function all<T extends Record<string, Promise<any>>>(
  promises: T
): Promise<{ [K in keyof T]: Awaited<T[K]> }>
export async function all<
  T extends Record<string, Promise<any>> | Promise<any>[],
>(promises: T) {
  const entries = isArray(promises)
    ? promises.map(p => [null, p] as [null, Promise<any>])
    : Object.entries(promises)

  const results = await Promise.all(
    entries.map(([key, value]) =>
      value
        .then(result => ({ result, exc: null, key }))
        .catch(exc => ({ result: null, exc, key })),
    ),
  )

  const exceptions = results.filter(r => r.exc)
  if (exceptions.length > 0)
    throw new AggregateError(exceptions.map(e => e.exc))

  if (isArray(promises)) {
    return results.map(r => r.result) as T extends Promise<any>[]
      ? PromiseValues<T>
      : unknown
  }

  return results.reduce(
    (acc, item) => ({
      ...acc,
      [item.key!]: item.result,
    }),
    {} as { [K in keyof T]: Awaited<T[K]> },
  )
}

/**
 * @description Async wait（异步等待）
 * @param milliseconds 等待时间
 * @returns Promise
 */
export function sleep(milliseconds: number) {
  return new Promise(res => setTimeout(res, milliseconds))
}
