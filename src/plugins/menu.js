import menu from '../components/home/editIcon.vue'

const plugins = {
  install: (Vue) => {
    Vue.component('Menu', menu)
  }
}
export default plugins