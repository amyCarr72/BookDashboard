<template>
  <UModal title="Book Details">
    <template #body>
      <div v-if="selectedBook" class="flex flex-col gap-4">
        <h2 class="text-lg font-semibold">{{ selectedBook?.title }}</h2>
        <p class="text-sm text-gray-500">Author: {{ selectedBook?.author }}</p>
        <p class="text-sm text-gray-500">ISBN: 1234567890</p>
        <div class="rating flex flex-row items-center">
          <UIcon
            v-for="n in 5"
            :key="n"
            name="material-symbols:star"
            class="size-4"
            :class="{
              'text-gray-500': n > selectedBook?.rating,
              'text-yellow-400': n <= selectedBook?.rating,
            }"
          />
          {{ selectedBook?.rating }}/5
        </div>
        <p class="text-sm text-gray-700">
          This is a brief description of the book. It provides an overview of the plot, characters,
          and themes.
        </p>
      </div>
    </template>
  </UModal>
</template>
<script setup lang="ts">
import { useBooksStore } from '@/stores/books'
import { computed } from 'vue'

const booksStore = useBooksStore()

const selectedBook = computed(() => booksStore.selectedBook)
</script>
