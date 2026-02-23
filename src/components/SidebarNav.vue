<template>
  <UDashboardSidebar resizable>
    <template #header>
      <UIcon name="streamline:open-book-solid" class="size-5 text-amber-300" />
      <h1 class="text-2xl font-bold">BookHub</h1>
    </template>
    <template #default>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        trailing-icon="none"
        :ui="{ linkLabel: 'py-3', linkLeadingIcon: 'text-white hover:text-white focus:text-white' }"
      />
    </template>
    <template #footer>
      <UIcon name="streamline:user-circle-single-solid" class="size-8 text-white/50" />
      <span class="flex flex-col">
        <span>Book Lover</span>
        <span class="text-sm text-gray-300">Reader</span>
      </span>
    </template>
  </UDashboardSidebar>
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
</script>
