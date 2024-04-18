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
import { list } from "../../dist";

onMounted(() => {

});


const download = () => {
  const fileUrl = 'https://www.douyin.com/aweme/v1/play/?video_id=v0200fg10000cnkpuf3c77u23t3ih4t0&line=0&file_id=70959f5972454016b94de0e1809adc31&sign=7227007acaae56f6652ae98985e3e561&is_play_url=1&source=PackSourceEnum_AWEME_DETAIL'
  const fileName = 'test.mp4'

  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  link.target = "_blank"; // 可选，如果希望在新窗口中下载文件，请取消注释此行
  link.click();

}
const removeEmptyValuesFunc = () => {
 
};
onMounted(()=>{
  const newList = list(0,10,'a')
 console.log('🍪-----newList-----', newList);
})




</script>
