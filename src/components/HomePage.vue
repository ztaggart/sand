<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
<template>
  <div ref="sandboxContainer" class="sandbox-container">
    <h1>The Sandbox</h1>
    <div class="link-container">
      <router-link to="/classic">
        <button class="btn btn-link">Classic Sandbox</button>
      </router-link>
      <button class="btn">TBA: More...</button>
    </div>
  </div>
</template>
<style scoped>
.sandbox-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.link-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.link-container > * {
  margin-top: 10px;
}
</style>
