import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import OrderableTable from '@/components/OrderableTable.vue'

const fakeNotes = [
    { id: 1, title: 'Random title', content: 'Random content', status: 'Completed' },
    { id: 2, title: 'Random title 2', content: 'Random content 2', status: 'Not Completed' },
    { id: 3, title: 'Random title 3', content: 'Random content 3', status: 'New' },
]

let wrapper

describe('OrderableTable', () => {
    beforeEach(() => {
        wrapper = mount(OrderableTable, { props: { defaultNotes: fakeNotes } })
    })

    it('renders properly', () => {
        expect(wrapper.find('.table').exists()).toBe(true)
        expect(wrapper.find('.table__header').exists()).toBe(true)
        expect(wrapper.findAll('tbody tr').length).toBe(3)
        expect(wrapper.findAll('tbody tr')[2].findAll('td')[1].text()).toBe('Random title 3')
    })

    it('emits an event when id up button clicked', () => {
        const idUpBtn = wrapper.findAll('.table__header-filter--up')[0]

        idUpBtn.trigger('click')
        expect(wrapper.emitted('orderBy')).toHaveLength(1)
        expect(wrapper.emitted('orderBy')[0]).toEqual(['id', 'ASC'])
    })

    it('emits an event when id down button clicked', () => {
        const idDownBtn = wrapper.find('.table__header-filter--down')

        idDownBtn.trigger('click')
        expect(wrapper.emitted('orderBy')).toHaveLength(1)
        expect(wrapper.emitted('orderBy')[0]).toEqual(['id', 'DES'])
    })
})
