<script setup lang="ts">
import { RouterView } from 'vue-router'
import DashboardLayout from './components/DashboardLayout.vue'
</script>

<template>
  <UApp>
    <DashboardLayout>
      <RouterView />
    </DashboardLayout>
  </UApp>
</template>

<style scoped></style>
