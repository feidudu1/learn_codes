<template>
  <div class="energy-container">
    <div class="energy-content">
      <div @click="changeA">改变主应用store的a值为：<span>{{ a }}</span></div>
      <!-- 导航列表 -->
      <VTabs />
      <!-- 汽车展示列表 -->
      <CarList />
      <!-- 轮播图 -->
      <CarSwapper />
      <!-- 广告图 -->
      <AdBanner />
      <!-- 车型列表 -->
      <NewsList />
    </div>
  </div>
</template>

<script lang="js">
import VTabs from '../../components/v-tabs/index.vue'
import CarList from './components/carList.vue'
import CarSwapper from './components/carSwapper.vue'
import AdBanner from './components/adBanner.vue'
import NewsList from './components/newsList.vue'
export default {
  name: 'index',
  components: {
    VTabs,
    CarList,
    CarSwapper,
    AdBanner,
    NewsList,
  },
  data () {
    return {

    }
  },
  computed: {
      a: function() {
        // NOTE: store这样的方式，changeA后不会引发页面a的值的改变，不是响应式的
      console.log(1111111, window.store.getStore().a);
      return window.store.getStore().a
    }
    
  },
  methods: {
    changeA() {
      window.store.update({
        ...this.a,
        a: 8
      })
    }
  },
};
</script>

<style lang="scss">
.energy{
  &-container{
    width: 100%;
  }
  &-content{
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
