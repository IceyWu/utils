import type { Awaitable } from '../types'
import { getObjVal } from '../object'

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
