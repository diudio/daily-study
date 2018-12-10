import mySwitch from './mySwitch'
import myCell from './myCell'
import myRadio from './myRadio'
import {myChecklist, myCheckbox} from './myChecklist'

var components = [
  mySwitch,
  myCell,
  myRadio,
  myChecklist,
  myCheckbox
]

var $vm

function install (Vue, options) {
  if (install.installed) {
    return // 表示已经安装过该库了
  } 
  // 注册组件
  components.forEach(d => {
  	// console.log(d)
    Vue.component(d.name, d) // 注册组件
  })
}
export default {install}
