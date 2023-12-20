<template>
  <div font-sans text="center gray-700 dark:gray-200" class="w-full h-screen flex flex-col">
    <div class="sticky top-0">
      <TheHeader />
    </div>
    <div class="w-full box-border">
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAsyncTask, removeEmptyValues } from "../../src";
let index = 0
const getPost = () => {
  index++
  console.log('🌳-----index-----', index)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: index, title: `Post ${index}` })
    }, 1000)
  })
}
let handleStop = null
onMounted(async () => {
  const {task,stop} = getAsyncTask(getPost,{
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
  console.log('🎉-----task-----', await task);
  // const obj = {
  //   name: 'John',
  //   age: null,
  //   listB:[],
  //   address: {
  //     street: '123 Main St',
  //     city: '',
  //     country: 'USA',
  //     listA:[]
  //   },
  //   hobbies: ['reading', '', 'swimming']
  // };
  // const result = removeEmptyValues(obj);
  // console.log(result);
});


</script>
