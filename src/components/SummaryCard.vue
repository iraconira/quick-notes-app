<script>
export default {
    props: {
        total: { type: Number, default: 0 },
        completed: { type: Number, default: 0 },
        notCompleted: { type: Number, default: 0 },
    },
}
</script>

<template>
    <div class="card">
        <div class="card__item">
            <h2>Total</h2>
            <p>{{ total }}</p>
        </div>
        <div class="card__item">
            <h2>Completed</h2>
            <p>{{ completed }}</p>
        </div>
        <div class="card__item">
            <h2>Not Completed</h2>
            <p>{{ notCompleted }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

.card {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    max-width: 40%;
    height: 6rem;
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    margin-bottom: 1rem;

    &__item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        padding: 1rem;

        h2 {
            font-size: 0.8rem;
            margin: 0;
            color: var(--ligth-grey);
            font-weight: 400;
        }

        p {
            font-size: 1.5rem;
            margin: -0.2rem 0;
            color: var(--grey);
        }
    }

    @include mobile {
        max-width: 100%;
        &__item {
            text-align: center;
        }
    }
}
</style>
