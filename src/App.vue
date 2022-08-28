<script>
import SummaryCard from '@/components/SummaryCard.vue'
import GenericLoader from '@/components/GenericLoader.vue'
import fetchNotes from '@/utils/fetchNotes'
import OrderableTable from '@/components/OrderableTable.vue'
import AddNote from '@/components/AddNote.vue'
import RemoveDialog from '@/components/RemoveDialog.vue'

export default {
    components: {
        SummaryCard,
        GenericLoader,
        OrderableTable,
        AddNote,
        RemoveDialog,
    },
    data() {
        return {
            loading: true,
            notes: [],
            removeNotes: [],
        }
    },
    async created() {
        const notes = await fetchNotes()
        this.notes = notes
        this.loading = false
    },
    methods: {
        notesByStatus(status) {
            return this.notes.filter((note) => note.status.toLowerCase() === status.toLowerCase())
                .length
        },
        sortByKey(key, dir) {
            return this.notes.sort((a, b) => {
                const x = dir === 'ASC' ? a[key] : b[key]
                const y = dir === 'ASC' ? b[key] : a[key]

                // if the item is numeric apply x - y  rule
                if (!isNaN(x) && !isNaN(y)) return x - y

                return x < y ? -1 : x > y ? 1 : 0
            })
        },
        appendNote(title, content) {
            const lastNote = this.notes.sort((a, b) => a.id - b.id)
            const lastId = lastNote[lastNote.length - 1]?.id

            return this.notes.push({
                id: Number(lastId ?? 0) + 1,
                title: title,
                content: content,
                status: 'New',
            })
        },
        showRemoveDialog(notes) {
            this.removeNotes = notes
        },
        deleteNotes(notes) {
            this.removeNotes = []
            let newNotes = []
            notes.forEach((note2) => {
                newNotes = this.notes.filter((note) => Number(note.id) !== Number(note2))
                return (this.notes = newNotes)
            })
        },
        closeDialog() {
            return (this.removeNotes = [])
        },
    },
}
</script>

<template>
    <main>
        <GenericLoader v-if="loading" />
        <template v-else>
            <SummaryCard
                :total="notes.length"
                :completed="notesByStatus('Completed')"
                :not-completed="notesByStatus('Not Completed')"
            />
            <OrderableTable
                :default-notes="notes"
                :default-selected="removeNotes"
                @order-by="sortByKey"
                @ask-to-remove-note="showRemoveDialog"
            />
            <AddNote @add-note="appendNote" />
            <Transition>
                <RemoveDialog
                    v-if="removeNotes.length && notes.length"
                    :remove-notes="removeNotes"
                    :total="notes.length"
                    @close-dialog="closeDialog"
                    @delete-notes="deleteNotes"
                />
            </Transition>
        </template>
    </main>
</template>

<style scoped lang="scss">
main {
    background: var(--ligther-grey);
    padding: 2rem;
    height: 100vh;
    width: 100wv;
    line-height: 1.4;
}

// animation effect
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
