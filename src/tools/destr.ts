const suspectProtoRx
  = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/
const suspectConstructorRx
  = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/
// eslint-disable-next-line
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?(E[+-]?\d+)?\s*$/i;

function jsonParseTransform(key: string, value: any): any {
  if (
    key === '__proto__'
    || (key === 'constructor'
    && value
    && typeof value === 'object'
    && 'prototype' in value)
  ) {
    warnKeyDropped(key)
    return
  }
  return value
}

function warnKeyDropped(key: string): void {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`)
}

export interface Options {
  strict?: boolean
  customVal?: any
}
/**
 * @description A faster, secure and convenient alternative for `JSON.parse`
 * @param  value The value to be parsed
 * @param  options The options
 * @returns parsed value
 * @category tools
 * @example
 * ```
 * // Returns "[foo"
 * destr("[foo");
 * // Return is not valid JSON
 * Json.parse("[foo")
 * ```
 */
export function destr<T = unknown>(value: any, options: Options = {}): T {
  if (typeof value !== 'string') {
    return options.customVal === undefined ? value : (options.customVal as T)
  }

  const _value = value.trim()
  if (value[0] === '"' && value.endsWith('"') && !value.includes('\\')) {
    return _value.slice(1, -1) as T
  }

  if (_value.length <= 9) {
    const _lval = _value.toLowerCase()
    if (_lval === 'true') {
      return true as T
    }
    if (_lval === 'false') {
      return false as T
    }
    if (_lval === 'undefined') {
      return undefined as T
    }
    if (_lval === 'null') {
      return null as T
    }
    if (_lval === 'nan') {
      return Number.NaN as T
    }
    if (_lval === 'infinity') {
      return Number.POSITIVE_INFINITY as T
    }
    if (_lval === '-infinity') {
      return Number.NEGATIVE_INFINITY as T
    }
  }

  if (!JsonSigRx.test(value)) {
    if (options.customVal !== undefined) {
      return options.customVal as T
    }
    if (options.strict) {
      throw new SyntaxError('[destr] Invalid JSON')
    }
    return value as T
  }

  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.customVal !== undefined) {
        return options.customVal as T
      }
      if (options.strict) {
        throw new Error('[destr] Possible prototype pollution')
      }
      return JSON.parse(value, jsonParseTransform)
    }
    return JSON.parse(value)
  }
  catch (error) {
    if (options.customVal !== undefined) {
      return options.customVal as T
    }
    if (options.strict) {
      throw error
    }
    return value as T
  }
}
/**
 * @description A faster, secure and convenient alternative for `JSON.parse`
 * @param  value The value to be parsed
 * @param  options The options
 * @returns parsed value
 * @category tools
 * @example
 * ```
 * // Throws an error
 * safeDestr("[foo");
 * // Return is not valid JSON
 * Json.parse("[foo")
 * ```
 */
export function safeDestr<T = unknown>(value: any, options: Options = {}): T {
  return destr<T>(value, { ...options, strict: true })
}

/**
 * @description A faster, secure and convenient alternative for `JSON.parse`
 * @param  value The value to be parsed
 * @param  options The options
 * @returns parsed value
 * @category tools
 * @example
 * ```
 * // Returns "defaultVal"
 * customDestr<string>("[foo", { customVal: "defaultVal" });
 * // Return is not valid JSON
 * Json.parse("[foo")
 * ```
 */
export function customDestr<T = unknown>(value: any, options: Options = {}): T {
  if (options.customVal === undefined)
    return destr<T>(value, { ...options, customVal: null })
  return destr<T>(value, { ...options })
}

export default destr
