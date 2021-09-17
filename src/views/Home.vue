<template>
  <div class="home">
    <baseInfo></baseInfo>
    <editIcon></editIcon>
  </div>
</template>

<script>
import baseInfo from '@/components/home/baseInfo'
import editIcon from '@/components/home/editIcon'

export default {
  name: "Home",
  components: {
    baseInfo,
    editIcon
  },
};
</script>

<style lang="sass" scoped>
.home
  border: 1px solid #ccc
  width: 1280px
  height: 900px
  background-color: #fff
  margin: 0 auto
  display: flex
</style>