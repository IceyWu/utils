<script setup>
import { useAddNumInOutlineLabel } from '../../.vitepress/utils/createElement.ts'
useAddNumInOutlineLabel(1)

import getObjVal from './getObjVal.vue'

</script>

::: tip 支持任意 `JavaScript` 环境或框架
处理对象
:::

## getObjVal

获取对象属性（可使用 `Array` 获取）

<div class="pure-border">

#### <divider-base /> {#base1}

<getObjVal />

<details>

<summary>查看代码</summary>

<<< @/utils/object/getObjVal.vue

</details>

#### <divider-param /> {#param1}

接收两个参数，第一个参数 `val` ，第二个参数 `key`，返回值类型 `any`

| **参数属性** | **说明**       | **类型** |
| ------------ | -------------- | -------- |
| `val`        | 原数据           | `any`  |
| `val`     | 获取的key值或者key数组 | `string` / `string[]` |

</div>
