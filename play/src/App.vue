<template>
  <div font-sans text="center gray-700 dark:gray-200" class="w-full h-screen flex flex-col">
    <div class="sticky top-0">
      <TheHeader />
    </div>
    <div class="w-full box-border">
      <button btn @click="download"> 文件下载</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { downloadFile,getAsyncTask, removeEmptyValues,getFileType,formatNumber ,randomString,debounce,throttle,sortObj,deepClone} from "../../src";

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




</script>
