import { getObjVal } from '../object'
import { isArray } from '../is'
import { to } from './index'

interface ValItem {
  keys: string[]
  valFormat?: any
}

export async function toPro<T, _any>(promise: Promise<T>, valList?: ValItem[]) {
  const [err, res] = await to(promise)
  if (err)
    return [err, undefined]

  if (isArray(valList)) {
    const resObj = res as any
    const dataList = [] as any
    valList.forEach(({ keys, valFormat }) => {
      const valList = keys.map((key) => {
        return getObjVal(resObj, key)
      })
      const tempVal = valFormat ? valFormat(valList) : valList
      if (isArray(tempVal) && tempVal.length === 1 && !valFormat)
        dataList.push(tempVal[0])
      else
        dataList.push(tempVal)
    })
    return [undefined, dataList]
  }
  else {
    return [undefined, res]
  }
}

export default {
  toPro,
}
