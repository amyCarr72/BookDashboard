import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HeaderNav from '../HeaderNav.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HeaderNav)
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
