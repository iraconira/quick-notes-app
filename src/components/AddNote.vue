<script>
export default {
    emits: ['addNote'],
    data() {
        return {
            showModal: false,
            title: '',
            titleError: false,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            contentError: false,
        }
    },

    methods: {
        addNote() {
            if (this.title === '') return (this.titleError = true)
            if (this.content === '') return (this.contentError = true)

            this.$emit('addNote', this.title, this.content)
            this.title = ''
            this.content = ''
            this.showModal = false
            this.titleError = false
            this.contentError = false
        },
    },
}
</script>

<template>
    <div class="add-wrapper">
        <Transition>
            <div v-show="showModal" class="add-wrapper__dialog">
                <p class="add-wrapper__dialog__title">Add note</p>
                <form @submit.prevent="addNote">
                    <input type="text" name="title" v-model="title" placeholder="Add title" />
                    <p v-if="titleError" class="add-wrapper__dialog__error">
                        * This field can't be empty
                    </p>
                    <textarea name="content" rows="3" cols="30" v-model="content"></textarea>
                    <p v-if="contentError" class="add-wrapper__dialog__error">
                        * This field can't be empty
                    </p>
                    <button class="add-wrapper__dialog__save" type="submit">Save</button>
                    <button
                        class="add-wrapper__dialog__cancel"
                        type="button"
                        @click="showModal = !showModal"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </Transition>
        <button class="add-wrapper__action" @click="showModal = !showModal">Add</button>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

.add-wrapper {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    max-width: 80%;
    margin-top: 1rem;

    &__dialog {
        width: 40%;
        padding: 1rem;
        background: var(--white);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        color: var(--grey);

        &__title {
            margin: 0 0 0.5rem;
        }
        input,
        textarea {
            width: 100%;
            color: var(--grey);
            border: 1px solid var(--grey);
            border-radius: 0.1rem;
            padding: 0.4rem;
            margin-bottom: 1rem;
        }

        textarea {
            margin-bottom: 0.8rem;
        }

        &__error {
            font-size: 0.8rem;
            margin: -0.8rem 0 0.4rem;
            color: var(--red);
        }

        &__save,
        &__cancel {
            width: 6rem;
            padding: 0.6rem 0.6rem;
            background-color: var(--blue);
            color: var(--light-blue);
            border: none;

            &:hover {
                cursor: pointer;
                opacity: 0.8;
            }
        }

        &__cancel {
            background-color: var(--white);
            color: var(--blue);
            margin-left: 1rem;
        }
    }

    &__action {
        position: absolute;
        right: 0;
        width: 10rem;
        padding: 0.6rem 0.6rem;
        background-color: var(--blue);
        color: var(--light-blue);
        border: none;

        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }
    @include mobile {
        max-width: 100%;
        flex-flow: column-reverse;

        &__dialog {
            width: 100%;
        }

        &__action {
            position: relative;
            width: 100%;
            margin-bottom: 1rem;
        }
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
}
</style>
