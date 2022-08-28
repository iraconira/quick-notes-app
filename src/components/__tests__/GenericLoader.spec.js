import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import GenericLoader from '../GenericLoader.vue'

describe('GenericLoader', () => {
    it('renders properly', () => {
        const wrapper = mount(GenericLoader)

        expect(wrapper.find('.loader')).toBeDefined
        expect(wrapper.find('.loader__dual-ring')).toBeDefined
    })
})
