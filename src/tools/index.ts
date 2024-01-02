/**
 * @description 获取对象属性
 * @param data 对象
 * @param path 属性路径 支持数组 ['a', 'b', 'c'] 或字符串 'a'
 * @returns { any } any:属性值
 */
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

/**
 * @description 去除对象中的空值，包括空数组
 * @param obj 对象
 * @returns { obj } obj:去除空值后的对象
 */
export function removeEmptyValues(obj: any) {
  if (typeof obj !== 'object')
    return obj

  if (Array.isArray(obj))
    return obj.filter(item => item !== null && item !== undefined && item.length !== 0)

  const result: any = {}

  Object.entries(obj).forEach(([key, value]) => {
    const val: any = value
    if (val !== null && val !== undefined && val?.length !== 0)
      result[key] = removeEmptyValues(val)
  })

  return result
}

/**
 * @description 获取文件类型
 * @param url 文件地址
 * @returns { image, video, pdf, document, audio, zip, excel, ppt, code, executable, presentation, other }
 */

export function getFileType(url: string): string {
  if (!url)
    return 'other'
  const fileTypes: { [key: string]: string[] } = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'],
    video: ['mp4', 'avi', 'mov'],
    pdf: ['pdf'],
    document: ['doc', 'docx', 'txt'],
    audio: ['mp3', 'wav', 'ogg'],
    zip: ['zip', 'rar', '7z'],
    excel: ['xls', 'xlsx', 'csv'],
    ppt: ['ppt', 'pptx'],
    code: ['js', 'html', 'css', 'java', 'cpp', 'py'],
    executable: ['exe', 'msi'],
    presentation: ['key'],
  }
  const fileExtension = url.split('.').pop()?.toLowerCase()
  for (const fileType in fileTypes) {
    if (fileTypes[fileType].includes(fileExtension!))
      return fileType
  }
  return 'other'
}

/**
 * @description 格式化数字，添加千位分隔符
 * @param num 数字
 * @returns { string } string:格式化后的数字
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * @description 生成指定长度的随机字符串
 * @param length 长度
 * @returns { string } string:随机字符串
 */
export function randomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  return result
}

/**
 * @description 防抖函数
 * @param func 函数
 * @param delay 延迟时间
 * @returns { Function } Function:防抖函数
 */
export function debounce(func: Function, delay: number): Function {
  let timer: NodeJS.Timeout
  return function (this: any, ...args: any[]) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * @description 节流函数
 * @param func 函数
 * @param delay 延迟时间
 * @returns { Function } Function:节流函数
 */
export function throttle(func: Function, delay: number): Function {
  let timer: NodeJS.Timeout
  let lastExecTime = 0
  return function (this: any, ...args: any[]) {
    const currentTime = Date.now()
    const remainingTime = delay - (currentTime - lastExecTime)
    clearTimeout(timer)
    if (remainingTime <= 0) {
      func.apply(this, args)
      lastExecTime = currentTime
    }
    else {
      timer = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, remainingTime)
    }
  }
}
