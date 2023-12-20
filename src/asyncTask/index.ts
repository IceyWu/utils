import type { Awaitable } from '../types'
import { getObjVal } from '../tools'

interface Rules {
  keys: string | string[]
  val: any
}

export function getAsyncTask(request: Awaitable<any>, rules: Rules[], asyncTime = 1000, maxTimes = 6) {
  let timer: string | number | NodeJS.Timeout | undefined
  let index = 0
  return new Promise((resolve) => {
    const getAsyncTask = async () => {
      const res = await request
      const isComplete = rules.every(({ keys, val }) => getObjVal(res, keys) === val)
      if (isComplete || index > maxTimes) {
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
}
