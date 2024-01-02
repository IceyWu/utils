import { createEventHook } from '@vueuse/core'

export interface DownloadFileReturn {
  onSuccess: any
  onProcess: any
  onError: any
  stop: () => void
}
export interface RequestHeader {
  [key: string]: string
}
export interface DownloadFileOptions {
  header: RequestHeader[] | undefined
}

export function createDownload(blob: Blob, fileName: string) {
  if (!blob || !fileName)
    return
  const element = document.createElement('a')
  const url = window.URL.createObjectURL(blob)
  element.style.display = 'none'
  element.href = url
  element.download = `${fileName}`
  document.body.appendChild(element)
  element.click()
  if (window.URL)
    window.URL.revokeObjectURL(url)
  else
    window.webkitURL.revokeObjectURL(url)
  document.body.removeChild(element)
}

export function downloadFile(url: string, fileName: string, option?: DownloadFileOptions): DownloadFileReturn {
  const xhr = new XMLHttpRequest() as any
  const { header } = option || {}
  if (header) {
    Object.keys(header).forEach((key: string) => {
      xhr.setRequestHeader(key, header[key as keyof typeof header])
    })
  }

  const onsuccess = createEventHook<any>()
  const onprocess = createEventHook<any>()
  const onerror = createEventHook<any>()
  const stop = () => {
    xhr.abort()
  }
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.send()
  xhr.onload = function () {
    if (this.status === 200)
      onsuccess.trigger(this.response)

    createDownload(this.response, fileName)
  }
  xhr.onprogress = function (e: any) {
    onprocess.trigger(e)
  }
  xhr.onerror = function (e: any) {
    onerror.trigger(e)
  }
  return {
    onSuccess: onsuccess.on,
    onProcess: onprocess.on,
    onError: onsuccess.on,
    stop,
  }
}
