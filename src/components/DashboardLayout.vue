<template>
  <UDashboardGroup class="h-screen bg-gray-50">
    <SidebarNav />
    <HeaderNav>
      <UDashboardContent>
        <UDashboardSearch @update:search-term="onSearch">
          <template #empty>
            <div v-if="searchResults.length > 0" class="p-4">
              <ul class="space-y-2">
                <li
                  v-for="book in searchResults"
                  :key="book.id"
                  class="p-2 bg-white rounded shadow hover:bg-gray-100 transition"
                >
                  <h4 class="text-md font-bold">{{ book.title }}</h4>
                  <p class="text-sm text-gray-600">{{ book.author }}</p>
                </li>
              </ul>
            </div>
          </template>
        </UDashboardSearch>
        <UContainer class="lg:px-48">
          <slot />
        </UContainer>
      </UDashboardContent>
    </HeaderNav>
  </UDashboardGroup>
</template>
<script setup lang="ts">
import SidebarNav from './SidebarNav.vue'
import HeaderNav from './HeaderNav.vue'
import { useBooksStore } from '@/stores/books'
import type { Book } from '@/stores/types'
import { ref } from 'vue'

const booksStore = useBooksStore()
const searchResults = ref([] as Book[])
const onSearch = async (searchTerm: string) => {
  searchResults.value = await booksStore.getSearchedBookResults(searchTerm)
}
</script>
