export interface DownloadFileReturn {
  onsuccess: (res: any) => void
  onprocess: (res: any) => void
  stop: () => void
}
export interface RequestHeader {
  [key: string]: string
}
export interface DownloadFileOptions {
  header: RequestHeader[] | RequestHeader | undefined
}

export function downloadFile(url: string, fileName: string, option?: DownloadFileOptions): DownloadFileReturn {

  const { header } = option || {}
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  header && Object.keys(header).forEach((key) => {
    xhr.setRequestHeader(key, header[key])
  })
  const onsuccess = (res: any) => {
    const blob = res
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = function (e) {
      console.log('🌳-----e-----', e)
    }
  }
  const onprocess = (e: any) => {
    console.log('🌳-----e-----', e)
  }
  const stop = () => {
    stopFlag = true
  }
  xhr.onload = function () {
    if (this.status === 200)
      onsuccess(this.response)
  }
  xhr.onprogress = function (e) {
    onprocess(e)
  }
  xhr.send()
  return {
    onsuccess,
    onprocess,
    stop,
  }
}
