import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    ui({
      colorMode: false,
      ui: {
        colors: {
          primary: 'blue',
        },
        dashboardSidebar: {
          slots: {
            root: 'relative hidden lg:flex flex-col min-h-svh min-w-16 w-(--width) shrink-0 ',
            header:
              'h-(--ui-header-height) shrink-0 flex flex-row items-center gap-1.5 px-4 bg-blue-600 border-b border-blue-500 text-white',
            body: 'flex flex-col gap-4 flex-1 overflow-y-auto px-0 py-2 bg-blue-600',
            footer:
              'shrink-0 flex items-center gap-1.5 px-4 py-2 bg-blue-600 border-t border-blue-500 text-white',
            toggle: '',
            handle: '',
            content: 'lg:hidden',
            overlay: 'lg:hidden',
          },
        },
        navigationMenu: {
          slots: {
            root: 'relative flex gap-1.5 [&>div]:min-w-0',
            item: 'min-w-0 bg-blue-600 text-white hover:text-white focus:text-white',
            link: 'group relative w-full flex items-center font-medium text-sm text-white hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none',
            linkLeadingIcon: 'shrink-0 size-5 text-white group-hover:text-white focus:text-white',
            linkLabel: 'truncate text-white',
          },
          variants: {
            active: {
              true: {
                item: 'text-white',
                link: 'bg-blue-500 py-3',
              },
              false: {
                item: 'text-white ',
                link: 'bg-blue-600 py-3',
              },
            },
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
