<template>
  <UPage>
    <UPageHeader :title="title" :description="description">
      <template #links>
        <slot name="links">
          <UButton
            variant="outline"
            color="primary"
            :icon="'material-symbols:add'"
            @click="openAddBookModal = !openAddBookModal"
          >
            Add Book
          </UButton>
        </slot>
      </template>
    </UPageHeader>
    <UPageBody>
      <slot />
      <AddBookForm v-model:open="openAddBookModal" @submit="openAddBookModal = !openAddBookModal" />
    </UPageBody>
  </UPage>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const { title, description } = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
})

const openAddBookModal = ref(false)
</script>
