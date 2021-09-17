<template>
  <div class="editIcon">
    <div class="icon_contain"
         id="bw_drag_area">
      <div class="icon_btn"
           v-for="(item, index) in imgList"
           :key="item && item.id"
           :dataIndex="index"
           :id="item && item.id"
           :dataUrl="item && item.url"
           @dragend.prevent="drop"
           @dragover.prevent="dragEnter"
           draggable="true"
           @dragstart="dragStrat">
        <div class="icon"
            :style="{
          backgroundImage: `url(${item && item.url})`,
          backgroundSize: 'contain'
        }">
        </div>
        <p class="title">{{ item && item.title }}</p>
      </div>
    </div>
    <img id="dragImg" src="../../assets/img/logo.png" style="position:absolute;top: -10000px;width: 50px; height: 50px;" alt="">
  </div>
</template>

<script>
import { menuArr } from '@/components/home/menuIcon.js'
export default {
  name: 'editIcon',
  components: {},
  data() {
    return {
      imgList: [],
      dropEl: '',
      clickX: 0,
      clickY: 0,
      last: 0,
    }
  },
  methods: {
    /**
     * 获取拖拽事件的元素id
     * param: event 元素事件
     * return {id, el}
     */
    getDragId(event) {
      try {
        let el = event.target
        let id = el.getAttribute('id')
        if (!id) {
          el = event.target.parentNode
          id = el.getAttribute('id')
        }
        let index = el.getAttribute('dataIndex')
        return {
          id,
          el,
          index,
        }
      } catch (error) {
        console.log('getDragId异常', error)
      }
    },
    /**
     * 判断拖拽事件是否出界
     * param: event 拖拽事件
     * return true / false
     */
    isInArea(e) {},
    /**
     * 获取拖拽边界
     * return { 边界位置 }
     */
    getBoundary() {
      let el = document.getElementById('bw_drag_area')
      let [maxX, minX, maxY, minY] = [0, 0, 0, 0]
      if (el) {
        maxX = el.offsetLeft + el.offsetWidth
        minX = el.offsetLeft
        maxY = el.offsetTop + el.offsetHeight
        minY = el.offsetTop
      }
      return {
        maxX,
        minX,
        maxY,
        minY,
      }
    },
    dragEnter(e) {
      try {
        let now = new Date()
        if (now - this.last > 200) {
          this.last = now
          let { id, index } = this.getDragId(e)
          if (id != this.dropEl.getAttribute('id')) {
            let dragIndex = this.dropEl.getAttribute('dataIndex')
            let dragObj = this.imgList[dragIndex]
            let changeItem = this.imgList[index]
            this.$nextTick(() => {
              this.imgList.splice(dragIndex, 1, changeItem)
              this.imgList.splice(index, 1, dragObj)
            })
          }
        }
      } catch (error) {
        console.log('dragEnter异常', error)
      }
    },
    // 放置方法
    drop(e) {
      try {
        this.dropEl.style.opacity = 1
        this.clickX = 0
        this.clickY = 0
      } catch (error) {
        console.log('drop异常', error)
      }
    },
    // 拖拽开始
    dragStrat(e) {
      try {
        let dragObj = this.getDragId(e)
        this.dropEl = dragObj.el
        this.clickX = e.x
        this.clickY = e.y
        let url = dragObj.el.getAttribute('dataUrl')
        let img = document.getElementById('dragImg')
        img.setAttribute('src', url)
        e.dataTransfer.setDragImage(img, 25, 25)
        this.dropEl.style.opacity = 0
      } catch (error) {
        console.log('dragStrat异常', error)
      }
    },
  },
  created() {
    this.imgList = _.cloneDeep(menuArr)
  },
  mounted() {
    console.log(this.getBoundary())
  },
}
</script>

<style lang="sass" scoped>
.editIcon
  width: calc(100% - 400px)
  border: 1px solid #ccc
  .icon_contain
    width: 100%
    display: flex
    flex-wrap: wrap
    position: relative
    .icon_btn
      width: 50px
      height: 60px
      cursor: pointer
      .icon
        width: 40px
        height: 40px
        margin: 0 auto
        img
          width: 100%
          height: 100%

      .title
        margin: 0px
</style>
