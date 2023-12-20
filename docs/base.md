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
const index = 0
function getPost() {
  index++
  console.log('🌳-----index-----', index)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: index, title: `Post ${index}` })
    }, 1000)
  })
}

const rules = [
  {
    keys: 'id',
    val: 4,
  },
]

getAsyncTask(getPost(), rules).then((post) => {
  // get val in id===4
  console.log(post)
})
```
