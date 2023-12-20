# @iceywu/utils

nothing to use 🧪.

## getObjVal

```ts
const baseData = {
  a: 1,
  b: {
    c: 2
  }
}

const aVal = getObjVal(baseData, 'a')
const cVal = getObjVal(baseData, ['b', 'c'])
```

## removeEmptyValues

```ts
const obj = {
  name: 'John',
  age: null,
  listB: [],
  address: {
    street: '123 Main St',
    city: '',
    country: 'USA',
    listA: []
  },
  hobbies: ['reading', '', 'swimming']
}
const result = removeEmptyValues(obj)
console.log(result)
{
    "name": "John",
    "address": {
        "street": "123 Main St",
        "country": "USA"
    },
    "hobbies": [
        "reading",
        "swimming"
    ]
}
```

## getAsyncTask

```ts
interface Rules {
  keys: string | string[]
  val: any
}
 interface GetAsyncTaskOptions {
  rules?: Rules[]
  params?: any
  asyncTime?: number
  maxTimes?: number
}

 interface GetAsyncTaskReturn {
  task: Promise<any>
  stop: () => void
}

let index = 0
const getPost = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: index, title: `Post ${index}` })
    }, 1000)
  })
}

  const { task, stop } = getAsyncTask(getPost,{
    rules:[
    {
      keys: 'id',
      val: 4,
    },
  ],
    params: {
      id: 4,
    },
  })
  handleStop = stop
  // get val in id===4
  console.log('🎉-----task-----', await task);
```
