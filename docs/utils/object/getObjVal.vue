<script setup lang="ts">
import { ref, computed } from "vue";
import { getObjVal } from "@iceywu/utils";

const aVal = ref(null);
const bVal = ref(null);
const getVal = ref("name");
const getVal2 = ref(["name"]);
const onClick = (type: number) => {
  if (type == 0) {
    aVal.value = getObjVal(showVal.value, getVal.value);
  }else{
    bVal.value = getObjVal(showVal.value, ['name']);
  }
};
const dynamicInputRule = {
  trigger: "input",
  validator(rule: unknown, value: string) {
    if (value.length >= 5) return new Error("最多输入四个字符");
    return true;
  },
};
const onCreate = () => {
  return {
    key: "",
    value: "",
  };
};
const model = ref({
  dynamicInputValue: [
    {
      key: "name",
      value: "小明",
    },
    {
      key: "age",
      value: "18",
    },
  ],
});
const showVal = computed(() => {
  const tempData = model.value.dynamicInputValue.reduce((acc, cur) => {
    if (cur.key && cur.value) {
      acc[cur.key] = cur.value;
    }
    return acc;
  }, {});
  return tempData;
});
</script>

<template>
  <naive-theme>
    <n-form :model="model">
      <n-dynamic-input
        v-model:value="model.dynamicInputValue"
        item-style="margin-bottom: 0;"
        :on-create="onCreate"
        #="{ index, value }"
      >
        <div style="display: flex">
          <n-form-item
            ignore-path-change
            :show-label="false"
            :path="`dynamicInputValue[${index}].key`"
            :rule="dynamicInputRule"
          >
            <n-input
              v-model:value="model.dynamicInputValue[index].key"
              placeholder="Key"
              @keydown.enter.prevent
            />
            <!--
            由于在 input 元素里按回车会导致 form 里面的 button 被点击，所以阻止了默认行为
          -->
          </n-form-item>
          <div style="height: 34px; line-height: 34px; margin: 0 8px">=</div>
          <n-form-item
            ignore-path-change
            :show-label="false"
            :path="`dynamicInputValue[${index}].value`"
            :rule="dynamicInputRule"
          >
            <n-input
              v-model:value="model.dynamicInputValue[index].value"
              placeholder="Value"
              @keydown.enter.prevent
            />
          </n-form-item>
        </div>
      </n-dynamic-input>
    </n-form>
    <div>
      <h2>输入数据:</h2>
      <pre>{{ JSON.stringify(showVal, null, 2) }}</pre>
    </div>

    <div>
      <h2>数据获取方式1-getObjVal(val,key):</h2>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <n-input v-model:value="getVal" type="text" placeholder="基本的 Input" />
        </n-col>
        <n-col :span="24">
          <div class="gap-5" style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click="onClick(0)"> 获取 </n-button>
            <n-button round type="error" @click="aVal = null"> 清除 </n-button>
          </div>
        </n-col>
      </n-row>
      <pre>结果：{{ JSON.stringify(aVal, null, 2) }}</pre>
    </div>
    <div>
      <h2>数据获取方式1-getObjVal(val,array):</h2>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <n-input v-model:value="getVal2" type="text" placeholder="基本的 Input" />
        </n-col>
        <n-col :span="24">
          <div class="gap-5" style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click="onClick(1)"> 获取 </n-button>
            <n-button round type="error" @click="aVal = null"> 清除 </n-button>
          </div>
        </n-col>
      </n-row>
      <pre>结果：{{ JSON.stringify(bVal, null, 2) }}</pre>
    </div>
  </naive-theme>
</template>
