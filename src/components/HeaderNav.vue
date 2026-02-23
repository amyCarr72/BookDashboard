<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Dashboard" toggle>
        <template #right>
          <UIcon name="material-symbols:notifications-rounded" class="size-5" />
          <UDashboardSearchButton collapsed />
        </template>
      </UDashboardNavbar>

      <slot />
    </template>
  </UDashboardPanel>
</template>
