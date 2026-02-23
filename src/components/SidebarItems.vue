<template>
  <UNavigationMenu :items="items" orientation="vertical">
    <template #item="{ item }">
      <UIcon :name="item.icon" class="text-white" />
      <div v-if="item.type === 'link'" :to="item.to" class="text-white">
        {{ item.label }}
      </div>
    </template>
  </UNavigationMenu>
  <!-- <UNavigationMenu
    :items="items"
    orientation="vertical"
    color="neutral"
    trailing-icon="none"
    :ui="{ linkLeadingIcon: 'text-white group-hover:text-white group-open:text-white' }"
  /> -->
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  {
    label: 'Dashboard',
    to: '/',
    icon: 'material-symbols:house',
    defautOpen: true,
    open: true,
    children: [{ label: 'My Books', to: '/' }],
  },
  { label: 'Settings', icon: 'material-symbols:settings', to: '/settings' },
  {
    label: 'Analytics',
    icon: 'material-symbols:bar-chart-4-bars',
    to: '/analytics',
  },
]

// const router = useRouter()
</script>
