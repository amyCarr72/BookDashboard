<template>
  <UPage>
    <UPageHeader :title="title" :description="description">
      <template #links>
        <slot name="links">
          <UButton variant="outline" color="primary" :icon="'material-symbols:add'">
            Add Book
          </UButton>
        </slot>
      </template>
    </UPageHeader>
    <UPageBody>
      <slot />
    </UPageBody>
  </UPage>
</template>
<script setup lang="ts">
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
</script>
