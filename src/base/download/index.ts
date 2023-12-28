import { createEventHook } from '@vueuse/core'

export interface DownloadFileReturn {
  onsuccess: any
  onprocess: any
  stop: () => void
}
export interface RequestHeader {
  [key: string]: string
}
export interface DownloadFileOptions {
  header: RequestHeader[] | RequestHeader | undefined
}

export function downloadFile(url: string, fileName: string, option?: DownloadFileOptions): DownloadFileReturn {
  const xhr = new XMLHttpRequest()
  const { header } = option || {}
  if (header) {
    Object.keys(header).forEach((key) => {
      xhr.setRequestHeader(key, header[key])
    })
  }

  const onsuccess = createEventHook<any>()
  const onprocess = createEventHook<any>()
  const stop = () => {
    console.log('🍧------------------------------>')
    xhr.abort()
  }
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.send()
  xhr.onload = function () {
    if (this.status === 200)
      onsuccess.trigger(this.response)
    // 存储
    

  }
  xhr.onprogress = function (e: any) {
    onprocess.trigger(e)
  }
  return {
    onsuccess: onsuccess.on,
    onprocess: onprocess.on,
    stop,
  }
}
