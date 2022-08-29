<script>
export default {
    emits: ['closeDialog', 'deleteNotes'],
    props: {
        removeNotes: {
            type: Array,
            default: () => [],
        },
        total: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        removeText() {
            return this.removeNotes.length === this.total
                ? 'all notes'
                : this.removeNotes.length === 1
                ? 'this note'
                : 'this notes'
        },
    },
}
</script>

<template>
    <div class="dialog">
        <p class="dialog__text">Do you want to remove {{ removeText }}?</p>
        <div>
            <button class="dialog__action--no" @click="$emit('closeDialog')">No</button>
            <button class="dialog__action--yes" @click="$emit('deleteNotes', removeNotes)">
                Yes
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

.dialog {
    position: absolute;
    bottom: 8rem;
    left: 35%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 60%;
    border-radius: 0.2rem;
    background: var(--red);
    color: var(--white);
    padding: 0.3rem;
    font-size: 0.8rem;

    &__text {
        position: relative;
        margin: auto 1rem;
        top: -2px;
        &::before {
            position: relative;
            top: 2px;
            content: '▲';
            font-size: 1.6rem;
        }
        &::after {
            content: '!';
            color: var(--red);
            position: absolute;
            left: 11px;
            top: 12px;
            font-size: 14px;
        }
    }
    &__action--no,
    &__action--yes {
        width: 5rem;
        border-radius: 0.2rem;
        padding: 0.5rem 0.6rem;
        font-size: 0.8rem;
        border: 0.5px solid var(--white);
        background-color: var(--red);
        margin-left: 0.4rem;
        color: var(--white);

        &:hover {
            cursor: pointer;
            opacity: 0.8;
        }
    }

    &__action--yes {
        background-color: var(--white);
        color: var(--red);
    }

    @include mobile {
        position: relative;
        width: 100%;
        left: unset;
        bottom: unset;
        margin-top: 1rem;
    }
}
</style>
