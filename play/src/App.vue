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
  const fileUrl = 'http://10.0.30.139:9000/zs-famous-teacher/2023-12-27/88339ea5-ae0a-4618-95a3-844b8291d26a.mp4'
  const fileName = '1.mp4'
  const {onprocess,onsuccess,stop} =  downloadFile(fileUrl,fileName)
  onprocess((e:any) => {
    console.log('🐬-----onprocess-----', e);
  })
  onsuccess((e:any) => {
    console.log('🐬-----onsuccess-----', e);
  })
}




</script>
