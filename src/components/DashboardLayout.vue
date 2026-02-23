<template>
  <UDashboardGroup class="h-screen bg-gray-50">
    <SidebarNav />
    <HeaderNav>
      <UDashboardContent>
        <slot />
      </UDashboardContent>
    </HeaderNav>
  </UDashboardGroup>
</template>
<script setup lang="ts">
import SidebarNav from './SidebarNav.vue'
import HeaderNav from './HeaderNav.vue'
</script>
