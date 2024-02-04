<template>
  <div font-sans text="center gray-700 dark:gray-200" class="w-full h-screen flex flex-col">
    <div class="sticky top-0">
      <TheHeader />
    </div>
    <div class="w-full box-border">
      <button btn @click="download"> 文件下载</button>
      <button btn @click="removeEmptyValuesFunc"> 空值移除</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { downloadFile,getAsyncTask,hasKey,setObjValue, removeEmptyValues,getFileType,formatNumber ,randomString,debounce,throttle,sortObj,deepClone} from "../../src";

onMounted( () => {
  
});


const download  = () => {
  const fileUrl = 'http://nest-js.oss-accelerate.aliyuncs.com/nestTest/noId/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20231206132229.jpg'
  const fileName = 'test.jpg'
  const {onProcess,onSuccess,stop} =  downloadFile(fileUrl,fileName)
  onProcess((e:any) => {
    console.log('🐬-----onprocess-----', e);
  })
  onSuccess((e:any) => {
    console.log('🐬-----onSuccess-----', e);
  })
}
const removeEmptyValuesFunc = () => {
  const obj = {
    a: 1,
    b: 2,
    c: '',
    d: null,
    e: undefined,
    f: 0,
    g: '0',
    h: ' ',
    i: '  ',
    ttVal:{
      a: 1,
      b: 2,
      c: '',
      d: null,
      e: undefined,
      f: 0,
      g: '0',
      h: ' ',
      i: '  ',
    },
    aaaa: null
  }
  const exclude = {
    // vals:[null],
    // keys:[['ttVal','e']]
    keys:[["e"]]
  }
  const ttVal = null
  const testSet = {}
  const res = removeEmptyValues(obj,exclude)
  console.log('🌈-----oldval-----', obj);
  console.log('🌈-----removeEmptyValuesFunc-----', res);
  // console.log('🦄------------------------------>',hasKey(obj,['ttVal','a']),hasKey(obj,['ttVal','aaaa']));
  // console.log('🎉-----setObjValue-----', setObjValue(testSet,["a","b"],1212));
};




</script>
