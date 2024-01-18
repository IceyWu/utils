import colors from 'ansi-colors'
import type { ILOG } from '../types'

/**
 *  打印类，分为四中类型
 *  @internal
 */
export const logType = {
  info: (msg: string, prefix = '') => colors.blueBright.bold(`${prefix}${msg}`),
  error: (msg: string, prefix = '') => colors.redBright.bold(`${prefix}${msg}`),
  warning: (msg: string, prefix = '') => colors.yellowBright.bold(`${prefix}${msg}`),
  success: (msg: string, prefix = '') => colors.greenBright.bold(`${prefix}${msg}`),
}

/**
 * 全局打印前缀
 * @internal
 */
export const globalPrefix = Symbol('Global Prefix Key')

/**
 * 设置打印的全局前缀
 * @param prefix 全局前缀
 */
export function setGlobalPrefix(prefix: string) {
  (globalThis as any)[globalPrefix] = prefix
}

/**
 * 打印日志函数
 * @param type 打印输出类别
 * @param msg 打印输出信息
 * @param prefix 打印输出前缀，默认全局前缀
 */
export function ILog(type: ILOG, msg: string, prefix = (globalThis as any)[globalPrefix] as string) {
  // eslint-disable-next-line no-console
  console.log(logType[type](msg, prefix))
}
