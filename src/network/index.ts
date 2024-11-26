export function getStreamResponse(
  content: Response,
  callback: (chunk: string) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!content.body) {
      reject(new Error('Response body is null'))
      return
    }
    const reader = content.body.getReader()
    const decoder = new TextDecoder()
    let result: string = ''

      type ReadResult = ReadableStreamReadResult<Uint8Array>

      function processText({ value, done }: ReadResult) {
        if (done) {
          resolve(result)
          return
        }
        const str = decoder.decode(value || new Uint8Array(), { stream: true })
        callback(str)
        result += str
        reader.read().then(processText).catch(reject)
      }

      reader.read().then(processText).catch(reject)
  })
}

const url
  = 'https://test.wktest.cn:3001/api/topic?page=1&size=100&sort=desc,createdAt'

export async function getResponse() {
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!resp.body) {
    throw new Error('Response body is null')
  }
  const reader = resp.body.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader.read()

    if (done)
      break

    const txt = decoder.decode(value)

    console.log(done)
    console.log(txt)
  }
}
