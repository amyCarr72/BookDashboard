<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-row justify-between">
    <div class="p-4 flex items-center mb-2 gap-4">
      <UIcon name="streamline:open-book-solid" class="size-6 text-amber-300" />
      <div>
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <p v-if="author" class="text-sm text-gray-500">{{ author }}</p>
        <p v-if="ISBN" class="text-sm text-gray-500">ISBN: {{ ISBN }}</p>
      </div>
    </div>
    <div class="p-4 flex flex-row gap-2 items-center">
      <div class="rating flex flex-row items-center">
        <UIcon
          v-for="num in 5"
          :key="num"
          name="material-symbols:star"
          class="size-4"
          :class="{ 'text-gray-500': num > rating, 'text-yellow-400': num <= rating }"
        />
        {{ rating }}/5
      </div>
      <UButton variant="outline" color="neutral" :icon="'material-symbols:edit'" size="xs" />
      <UButton variant="outline" color="neutral" :icon="'material-symbols:visibility'" size="xs" />
      <UButton variant="outline" color="neutral" :icon="'material-symbols:delete'" size="xs" />
    </div>
  </div>
</template>
<script setup lang="ts">
const { title, author, ISBN, rating } = defineProps({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
    default: '',
  },
  ISBN: {
    type: String,
    required: false,
    default: '',
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
})
</script>
