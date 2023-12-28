
<details>
  <summary>sortObj-对象排序</summary>
  <pre>
  <code>
    import { sortObj } from "@iceywu/utils";
    const sortData = sortObj(data);
  </code>
  </pre>
</details>

<details>
  <summary>deepClone-深拷贝</summary>
  <pre>
  <code>
    import { deepClone } from "@iceywu/utils";
    const cloneData = deepClone(data);
  </code>
  </pre>
</details>

<details>
  <summary>getObjVal-获取对象属性</summary>
  <pre>
  <code>
    import { getObjVal } from "@iceywu/utils";
    const baseData = {
      a: 1,
      b: {
        c: 2
      }
    }
    const aVal = getObjVal(baseData, 'a')
    const cVal = getObjVal(baseData, ['b', 'c'])
  </code>
  </pre>
</details>
<details>
  <summary>removeEmptyValues-去除对象中的空值</summary>
  <pre>
  <code>
    import { removeEmptyValues } from "@iceywu/utils";
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
  </code>
  </pre>
</details>

<details>
  <summary>getAsyncTask-异步任务</summary>
  <pre>
  <code>
    import { getAsyncTask } from "@iceywu/utils";
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
  </code>
  </pre>
</details>
<details>
  <summary>compareObjects-返回两对象中变化过的数据</summary>
  <pre>
  <code>
    import { compareObjects } from "@iceywu/utils";
    const obj1 = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5,
        g: 6,
      },
      h: [1, 2, 3, 4, 5],
    };
    const obj2 = {
      a: 1,
      b: 2,
      c: 3,
      d: {
        e: 4,
        f: 5,
        g: 6,
      },
      h: [1, 2, 3, 4, 5],
    };
    const ttData = compareObjects(obj1, obj2);
  </code>
  </pre>
</details>
<details>
  <summary>getFileType-获取文件类型</summary>
  <pre>
  <code>
    import { getFileType } from "@iceywu/utils";
    const fileType = getFileType(fileUrl);
  </code>
  </pre>
</details>
<details>
  <summary>formatNumber-格式化数字，添加千位分隔符</summary>
  <pre>
  <code>
    import { formatNumber } from "@iceywu/utils";
    const data = formatNumber(number);
  </code>
  </pre>
</details>
<details>
  <summary>randomString-生成指定长度的随机字符串</summary>
  <pre>
  <code>
    import { randomString } from "@iceywu/utils";
    const data = randomString(length);
  </code>
  </pre>
</details>
<details>
  <summary>debounce-防抖函数</summary>
  <pre>
  <code>
    import { debounce } from "@iceywu/utils";
    debounce(fn, delay);
  </code>
  </pre>
</details>
<details>
  <summary>throttle-节流函数</summary>
  <pre>
  <code>
    import { throttle } from "@iceywu/utils";
    throttle(fn, delay);
  </code>
  </pre>
</details>
