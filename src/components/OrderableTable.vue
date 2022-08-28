<script>
export default {
    emits: ['orderBy', 'askToRemoveNote'],
    props: {
        defaultNotes: {
            type: Array,
            default: () => [
                {
                    id: 0,
                    title: '',
                    content: '',
                    status: '',
                },
            ],
        },
        defaultSelected: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            notes: this.defaultNotes,
            selectedNotes: this.defaultSelected,
        }
    },
    computed: {
        headers() {
            return Object.keys(this.notes[0]).map((title) => this.capitalize(title))
        },
    },
    methods: {
        checkAll(checked) {
            return checked
                ? (this.selectedNotes = this.notes.map((item) => Number(item.id)))
                : (this.selectedNotes = [])
        },

        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1)
        },

        isChecked(id) {
            this.selectedNotes = this.defaultSelected
            return this.defaultSelected.includes(id)
        },
    },
    watch: {
        selectedNotes() {
            this.$emit('askToRemoveNote', this.selectedNotes)
        },
    },
}
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="header in headers" :key="header">
                    <div class="table__header">
                        <span>
                            <input
                                v-if="header === 'Id'"
                                type="checkbox"
                                @change="(e) => checkAll(e.target.checked)"
                            />
                            <p>{{ header }}</p>
                        </span>
                        <div class="table__header-filter">
                            <span
                                class="table__header-filter--up"
                                @click="$emit('orderBy', header.toLowerCase(), 'ASC')"
                                >&#94;</span
                            >
                            <span
                                class="table__header-filter--down"
                                @click="$emit('orderBy', header.toLowerCase(), 'DES')"
                                >&#94;</span
                            >
                        </div>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="{ id, title, content, status } in defaultNotes" :key="id">
                <td>
                    <input
                        type="checkbox"
                        :value="Number(id)"
                        v-model="selectedNotes"
                        :checked="isChecked(Number(id))"
                    />
                    {{ id }}
                </td>
                <td>{{ title }}</td>
                <td>{{ content }}</td>
                <td>{{ status }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

.table {
    border-collapse: collapse;
    width: 80%;
    background-color: var(--white);
    font-size: 0.8rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);

    thead {
        color: var(--white);
        background: var(--grey);
        border: none;

        th {
            border-right: 1px solid;
            border-color: var(--white);
        }

        & th:last-child {
            border: none;
        }
    }

    &__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: 400;
        padding: 0.2rem 0.6rem;
        min-width: 8rem;
        line-height: 2;

        span {
            display: flex;
            justify-content: center;
            p {
                margin: 0 0.2rem;
            }
        }

        &-filter {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 1.2rem;

            &--up,
            &--down {
                font-family: monospace;
                font-size: 14px;
                height: 12px;
                width: 2rem;
                line-height: 1;

                &:hover {
                    cursor: pointer;
                    opacity: 0.6;
                }
            }

            &--down {
                transform: rotate(180deg);
            }
        }
    }

    tbody {
        tr {
            border-bottom: 1px solid;
            border-color: var(--ligther-grey);
            color: var(--grey);

            td {
                padding: 0.4rem 0.8rem;
            }
            & td:first-child {
                color: var(--light-blue);
            }
        }

        & tr:last-child {
            border: none;
        }
    }

    @include mobile {
        width: 100%;

        &__header {
            min-width: unset;
        }
    }
}
</style>
