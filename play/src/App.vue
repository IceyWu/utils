<template>
  <div
    font-sans
    text="center gray-700 dark:gray-200"
    class="w-full h-screen flex flex-col"
  >
    <div class="sticky top-0">
      <TheHeader />
    </div>
    <div class="w-full box-border">
      <button btn @click="download">文件下载</button>
      <button btn @click="removeEmptyValuesFunc">空值移除</button>
      <button btn @click="testTopro">toPro</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { list, consolePlus, removeEmptyValues, toPro, to } from "../../src";

onMounted(() => {
  consolePlus.log("warning", "test");
  consolePlus.error("error", "error test", "[Error]: ");
});

const download = () => {
  const fileUrl =
    "https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cnkpuf3c77u23t3ih4t0&line=0&file_id=70959f5972454016b94de0e1809adc31&sign=7227007acaae56f6652ae98985e3e561&is_play_url=1&source=PackSourceEnum_AWEME_DETAIL";
  const fileName = "test.mp4";

  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;
  link.target = "_blank"; // 可选，如果希望在新窗口中下载文件，请取消注释此行
  link.click();
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
