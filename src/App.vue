<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, RouterLink, useRoute } from 'vue-router';
const route = useRoute();
const currentRoute = computed(() => route.path);
console.log(currentRoute);
</script>

<template>
  <div class="page-container wh-100">
    <div v-if="currentRoute !== '/'" class="nav-bar">
      <router-link to="/">
        <div class="btn-back">
          <i class="gg-arrow-left"></i>
          <span>Home</span>
        </div>
      </router-link>
    </div>
    <div class="page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.wh-100 {
  width: 100%;
  height: 100%;
}
.page-container {
  display: flex;
  flex-flow: column;
  background-color: var(--main-bg-color);
}

.page-container .page-nav {
  flex: 0 1 auto;
}

.page-container .page-content {
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  overflow-y: auto;
}
.btn-back {
  display: flex;
  align-items: center;
  min-width: 15px;
}

.gg-arrow-left {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(var(--ggs, 1));
  width: 22px;
  height: 22px;
}
.gg-arrow-left::after,
.gg-arrow-left::before {
  content: '';
  display: block;
  box-sizing: border-box;
  position: absolute;
  left: 3px;
}
.gg-arrow-left::after {
  width: 8px;
  height: 8px;
  border-bottom: 2px solid;
  border-left: 2px solid;
  transform: rotate(45deg);
  bottom: 7px;
}
.gg-arrow-left::before {
  width: 16px;
  height: 2px;
  bottom: 10px;
  background: currentColor;
}
</style>
./grids/Grid
