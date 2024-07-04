import { getObjVal } from '../object'
import { isArray } from '../is'
import { to } from './index'

interface ValItem {
  keys: string[]
  valFormat?: any
}


/**
 * @description 简化数据请求
 * @param any value
 * @returns 获取列表
 * @category to
 * @example
 * ```
 *  //自定义配置项
 *   const valList = [
 *  {
 *    keys: ["code", "result.content"],
 *    valFormat: (valList: any) => {
 *      const [code, content] = valList;
 *      return code === 0 ? content : [];
 *    },
 *  },
 * ];
 * const [err, res] = await toPro(testFunc(), valList);
 * const [dataList, timestamp, code] = res;
 * 
 * ```
 */
export async function toPro(promise: Promise<T>, valList?: ValItem[]) {
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
