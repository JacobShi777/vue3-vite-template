<script lang="ts" setup>
import Navbar from './components/Navbar/index.vue'
import Header from './components/Header.vue'
import { useSettingStore } from '@/store/setting'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const animateClass = ref(false)
const settingStore = useSettingStore()
const navbarWidth = computed(() => {
  return settingStore.navbarWidth + 'px'
})

onMounted(() => {
  setTimeout(() => {
    animateClass.value = true
  }, 0)
})
</script>

<template>
  <div class="layout">
    <Navbar />
    <div class="right" :class="{ animate: animateClass }">
      <Header />
      <div class="app-content">
        <router-view v-slot="{ Component, route }">
          <keep-alive>
            <component v-if="route.meta.keepAlive" :is="Component" :key="route.path" />
          </keep-alive>
          <component v-if="!route.meta.keepAlive" :is="Component" :key="route.path" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  height: 100%;
}
.right {
  margin-left: v-bind(navbarWidth);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .app-content {
    overflow-y: auto;
    flex: 1;
  }
}

.animate {
  transition: all 0.5s ease-in-out;
}
</style>
