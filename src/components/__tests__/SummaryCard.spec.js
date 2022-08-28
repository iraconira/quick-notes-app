import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SummaryCard from '../SummaryCard.vue'

describe('SummaryCard', () => {
    it('renders properly with no params (default values)', () => {
        const wrapper = mount(SummaryCard, { props: {} })

        expect(wrapper.text()).toContain('Total')
        expect(wrapper.findAll('.card__item p')[0].text()).toContain(0)
        expect(wrapper.text()).toContain('Completed')
        expect(wrapper.findAll('.card__item p')[1].text()).toContain(0)
        expect(wrapper.text()).toContain('Not Completed')
        expect(wrapper.findAll('.card__item p')[2].text()).toContain(0)
        expect(wrapper.text()).toContain('Not Completed')
    })

    it('renders properly if params are passed', () => {
        const wrapper = mount(SummaryCard, {
            props: { total: 12, completed: 4, notCompleted: 3 },
        })
        expect(wrapper.findAll('.card__item p')[0].text()).toContain(12)
        expect(wrapper.findAll('.card__item p')[1].text()).toContain(4)
        expect(wrapper.findAll('.card__item p')[2].text()).toContain(3)
    })
})
