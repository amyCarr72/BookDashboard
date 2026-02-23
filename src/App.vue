<script setup lang="ts">
import { RouterView } from 'vue-router'
import DashboardLayout from './components/DashboardLayout.vue'
import { useBooksStore } from './stores/books'

const booksStore = useBooksStore()
booksStore.init()
</script>

<template>
  <UApp>
    <DashboardLayout>
      <RouterView />
    </DashboardLayout>
  </UApp>
</template>

<style scoped></style>
