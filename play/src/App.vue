<template>
  <div
    font-sans
    text="center gray-700 dark:gray-200"
    class="w-full h-screen flex flex-col"
  >
    <div class="sticky top-0">
      <TheHeader />
    </div>
    <div
      class="w-full box-border flex gap-1 flex-col items-center flex-wrap box-border p-4"
    >
      <!-- <button btn @click="download">文件下载</button>
      <button btn @click="removeEmptyValuesFunc">空值移除</button>
      <button btn @click="testTopro">toPro</button> -->
      <button btn @click="change">testVal++{{ idTest }}</button>
      <!-- <button btn @click="params2.id++">testVal++{{params2.id  }}</button> -->
      <button btn @click="testFuncTT">test</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import {
  list,
  consolePlus,
  removeEmptyValues,
  toPro,
  to,
  downloadFile,
  destr,
  safeDestr,
  customDestr,
  getAsyncTask,
  getObjValByKeys,
} from "../../src";
let flag = 1;
const asyncTaskApi = (params) => {
  console.log("🐳-----asyncTaskApi-----", params);
  flag++;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        msg: "请求成功",
        data: {
          complete: flag > 4,
          list: [],
        },
      });
    }, 1000);
  });
};

const rules = [
  {
    keys: "code",
    val: 200,
  },
  {
    keys: ["data", "complete"],
    val: true,
  },
];
const idTest = ref(1);
const params = {
  id: idTest.value,
};
const params2 = ref({
  id: idTest.value,
});

let functionObj = async (a, b, c, d) => {
  setInterval(() => {
    console.log(a, b, c, d);
  }, 1000);
};
function change() {
  functionObj = async (a, b, c, d) => {
    setInterval(() => {
      console.error(a, b, c, d);
    }, 1000);
  };
}

const { task, start } = getAsyncTask(functionObj, {
  rules,
  params: () => ({ id: idTest.value }),
  autoStart: false,
});
const testFuncTT = async () => {
  const obj = {
    a:'',
    b:'',
    c:{
      d: "1",
      
    },
    f:[
      {
        g:undefined,
      }
    ]
  }
  const data = getObjValByKeys(obj, [
    "a",
    "c.dd",
     "f[0].g",
    ],
  '默认值');
  console.log('🐳-----data-----', data);
};

onMounted(() => {
  consolePlus.log("warning", "test");
  consolePlus.error("error", "error test", "[Error]: ");
});

const download = () => {
  const fileUrl =
    "http://nest-js.oss-accelerate.aliyuncs.com/nestDev/_DSC0242.JPG";
  const fileName = "test.mp4";

  // const link = document.createElement("a");
  // link.href = fileUrl;
  // link.download = fileName;
  // link.target = "_blank"; // 可选，如果希望在新窗口中下载文件，请取消注释此行
  // link.click();
  const testD = downloadFile(
    fileUrl,
    fileName,

    {
      onSuccess: (res) => {
        console.log("🍪-----res-----", res);
      },
      onProcess: (progress) => {
        console.log("🍪-----progress-----", progress);
      },

      onError: (err) => {
        console.log("🍪-----err-----", err);
      },
    },
    {}
  );
  console.log("🍪-----testD-----", testD);

  interface A{
    Start(action: Function,
      isComplete: Function,
      maxCount: number,
      ...args: any[]):void
  }
  class AsyncTask implements A{
    private isRunning: boolean = false;
    constructor() {}
    public async Start(
      action: Function,
      isComplete: Function,
      maxCount: number,
      ...args: any[]
    ): Promise<void> {
      if (!action) return;
      let res;
      let count = 0;
      this.isRunning = true;
      while (this.isRunning && (count < maxCount || maxCount <= 0)) {
        res = await action(...args);
        if (isComplete?.(res)) {
          break;
        }
      }
    }

    public Stop() {
      this.isRunning = false;
      return this;
    }
  }
 
  //代替上面：


  // testD();
  const a:A = new AsyncTask();
  a.Start();
  (a as AsyncTask).Stop();
};
const removeEmptyValuesFunc = () => {
  const tempData = {
    a: 6,
    b: undefined,
    c: null,
    d: "",
    e: 0,
    f: false,
    g: [],
    h: {},
    i: () => {},
    yy: {
      a: 6,
      b: undefined,
      c: null,
      d: "",
    },
  };
  const emptyOptions = {
    keys: ["b"],
    vals: [null],
  };
  console.log("🌈-----tempData-----", tempData);
  const newList = removeEmptyValues(tempData, emptyOptions);
  console.log("🍪-----newList-----", newList);
};
// 用promise模拟接口请求
const testFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        code: 0,
        msg: "请求成功",
        result: {
          content: [
            {
              id: 301,
              createdAt: 1719984382312,
              updatedAt: 1719984382312,
              content: "11",
              senderId: "3033815340526501",
              recipientId: "3033815410526537",
              unread: false,
              messageTime: 1719984382326,
              code: "3033815410526537_3033815340526501",
              leaveMessageFileList: null,
            },
          ],

          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          numberOfElements: 2,
          empty: false,
        },
        timestamp: 1719984444474,
      });
    }, 1000);
  });
};
const testTopro = async () => {
  const valList = [
    {
      keys: ["code", ["result", "content"]],
      valFormat: (valList: any) => {
        const [code, content] = valList;
        return code === 0 ? content : [];
      },
    },
    {
      keys: ["msg"],
    },
  ];
  const [err, res] = await toPro(testFunc(), valList);
  const [dataList, timestamp] = res;
  consolePlus.log("dataList", dataList, timestamp);
};
onMounted(() => {
  const newList = list(0, 10, "a");
  console.log("🍪-----newList-----", newList);
});
</script>
