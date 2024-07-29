import { getObjVal } from '../object'
import { isArray } from '../is'
import { to } from './index'

interface ValItem {
  keys: string | any[]
  valFormat?: any
}

/**
 * @description 简化数据请求
 * @param  promise 请求
 * @param  valList 自定义配置项
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
export async function toPro<T, _any>(promise: Promise<T>, valList?: ValItem[]) {
  return to(promise)
    .then((re: any) => {
      const [err, res] = re || [undefined, undefined]
      if (err)
        return [err, undefined]
      if (isArray(valList)) {
        const resObj = res as any
        const dataList = [] as any
        valList.forEach(({ keys, valFormat }) => {
          const tempKeys = isArray(keys) ? keys : [keys]
          const valList = tempKeys.map((key: any) => {
            return getObjVal(resObj, key)
          })
          const tempVal = valFormat ? valFormat(valList) : valList
          if (isArray(tempVal) && tempVal.length === 1 && !valFormat)
            dataList.push(tempVal[0])
          else dataList.push(tempVal)
        })
        return [undefined, dataList]
      }
      else {
        return [undefined, res]
      }
    })
    .catch(err => [err, undefined])
}

export default {
  toPro,
}
