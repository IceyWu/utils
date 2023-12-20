// 获取对象属性
export function getObjVal(data: any, path: string | string[]) {
  if (Array.isArray(path)) {
    let tempData = data
    for (const key of path) {
      if (tempData[key] === undefined)
        return undefined
      tempData = tempData[key]
    }
    return tempData
  }
  return data[path]
}

// 去除对象中的空值，包括空数组
export function removeEmptyValues(obj: any) {
  if (typeof obj !== 'object')
    return obj

  if (Array.isArray(obj))
    return obj.filter(item => item !== null && item !== undefined && item.length !== 0)

  const result: any = {}

  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value.length !== 0)
      result[key] = removeEmptyValues(value)
  })

  return result
}
