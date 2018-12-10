<template>
  <div :class="prefix">
    <div :class="`${prefix}__title`" v-if="title">{{title}}</div>
    <label 
      v-for="option in options" 
      :key="option.label"
    >
      <my-cell 
        :title="option.label"
      >
        <my-checkbox 
          slot="icon"
          :value="option.value"
          :checked="checked(option.value)"
          v-on:change="toggleState"
        ></my-checkbox>
      </my-cell>
    </label>
  </div>
</template>
<script>
  const prefix = "my-checklist"
  export default {
    name: prefix,
    model: {
      prop: 'checkedValue',
      event: 'change'
    },
    props: {
      options: {
        type: Array,
        default: []
      },
      checkedValue: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ""
      }
    },
    data () {
      return {
        prefix
      }
    },
    methods: {
      checked (val) {
        return this.checkedValue.indexOf(val) !== -1
      },
      toggleState (state,val) {
        if (state) {
          let _checkedValue = JSON.parse(JSON.stringify(this.checkedValue))
          _checkedValue.push(val)
          this.$emit('change', _checkedValue)
        } else {
          let index = this.checkedValue.indexOf(val)
          let _checkedValue = this.checkedValue.slice(0, index).concat(this.checkedValue.slice(index+1))
          this.$emit('change', _checkedValue)
        }
      }
    }
  }
</script>
<style lang="less">
  .my-checklist {
    &__title {
      padding-left: 20px;
      line-height: 30px;
      font-size: 12px;
      color: #666;
    }
  }
</style>  