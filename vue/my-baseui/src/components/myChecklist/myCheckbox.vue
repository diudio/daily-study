<template>
  <span :class="className" >
    <input 
      type="checkbox"
      style="display: none;"
      :checked="checked"
      :value="value"
      v-on:change="toggleState"
    >
  </span>
</template>
<script>
  const prefix = "my-checkbox"
  export default {
    name: prefix,
    props: {
      checked: {
        type: Boolean,
        default: false
      },
      value: {
        type: [String, Number]
      }
    },
    data () {
      return {
        prefix
      }
    },
    computed: {
      className () {
        return [
          prefix,
          {[`${prefix}__checked`]: this.checked}
        ]
      }
    },
    methods: {
      toggleState () {
        this.$emit('change', !this.checked, this.value)
      }
    }
  }
</script>
<style lang="less">
  .my-checkbox {
    width: 20px;
    height: 20px;
    display: inline-block;
    position: relative;
    margin-right: 20px;
    vertical-align: baseline;
    &:before {
      content: " ";
      position: absolute;
      border: 1px solid #eee;
      background-color: #fff;
      border-radius: 10px;
      width: 18px;
      height: 18px;
      top: 0;
      left: 0;
    }
    &:after {
      content: " ";
      position: absolute;
      border: 2px solid #fff;
      border-left: 0;
      border-top: 0;
      transition: transform .2s linear;
      transform: scale(0) rotate(45deg);
      top: 3px;
      left: 7px;
      width: 4px;
      height: 8px;
    }
  }
  .my-checkbox__checked:before {
    background-color: #26a2ff;
  }
  .my-checkbox__checked:after {
    transform: scale(1) rotate(45deg);
  }
</style>  