import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import GenericLoader from '../GenericLoader.vue'

describe('GenericLoader', () => {
    it('renders properly', () => {
        const wrapper = mount(GenericLoader)

        expect(wrapper.find('.loader').exists()).toBe(true)
        expect(wrapper.find('.loader__dual-ring').exists()).toBe(true)
    })
})
