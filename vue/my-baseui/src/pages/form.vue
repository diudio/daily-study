<template>
  <div>
    <my-cell :title="`选项`">
      <img slot="icon" src="../assets/img/Pound.png" alt="">
      <my-switch v-model="value_1"></my-switch>
    </my-cell>
    <my-cell :title="`选项`">
      <p>{{value_2}}</p>
      <!-- v-model 在组件根元素上挂载一个v-bind属性, 并挂载一个接受$emit的事件 -->
      <my-switch v-model="value_2"></my-switch>
    </my-cell>
    <my-cell title="1">
      <my-radio slot="icon" v-model="radio" label="1"></my-radio>
    </my-cell>
    <my-cell title="2">
      <my-radio slot="icon" v-model="radio" label="2"></my-radio>
    </my-cell>
    <my-checklist
      v-model="checkboxValue"
      :options="options"
      title="复选框列表"
    >
    </my-checklist>
    {{checkboxValue}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      value_1: true,
      value_2: false,
      radio: '1',
      checkboxValue: ['B'],
      options: [
        {
          label: 'optionA',
          value: 'A',
          disabled: true
        },
        {
          label: 'optionB',
          value: 'B',
          disabled: true
        },
        {
          label: 'optionC',
          value: 'C'
        },
        {
          label: 'optionD',
          value: 'D'
        }
      ]
    }
  }
}
</script>

<style lang="less">

</style>
