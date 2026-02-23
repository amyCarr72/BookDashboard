import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SidebarNav from '../SidebarNav.vue'

describe('SidebarNav', () => {
  it('renders properly', () => {
    const wrapper = mount(SidebarNav)
    expect(wrapper.html()).toContain('BookHub')
  })
})
