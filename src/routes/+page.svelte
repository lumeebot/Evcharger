<script lang="ts"  >
    import { onMount } from "svelte";
    export let charger_type_DC = [false];
    export let charger_type_COMBO = [false];
    export let charger_type_FULL = [false];
    export let charger_type_AC3 = [false];
</script>

<div class="container">
    <div class="title">타입</div>
    {#each charger_type_AC3 as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() =>
                (charger_type_AC3[i] = !charger_type_AC3[i])}
        >
            <img
                src="/img/charge{i}.png"
                width="200"
                height="200"
                alt="charge{i}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">AC3상</span>
        </div>
    {/each}
    {#each charger_type_FULL as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() =>
                (charger_type_FULL[i] = !charger_type_FULL[i])}
        >
            <img
                src="/img/charge{i + 1}.png"
                width="200"
                height="200"
                alt="charge{i + 1}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">AC완속</span>
        </div>
    {/each}
    {#each charger_type_COMBO as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() =>
                (charger_type_COMBO[i] = !charger_type_COMBO[i])}
        >
            <img
                src="/img/charge{i + 2}.png"
                width="200"
                height="200"
                alt="charge{i + 2}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">DC콤보</span>
        </div>
    {/each}
    {#each charger_type_DC as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() =>
                (charger_type_DC[i] = !charger_type_DC[i])}
        >
            <img
                src="/img/charge{i + 3}.png"
                width="200"
                height="200"
                alt="charge{i + 3}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">DC</span>
        </div>
    {/each}

    <div />
    <a href="/server" style="cursor: pointer;" class="choose_finish">선택완료</a
    >
</div>

<style>
    .container {
        display: grid;
        width: 100%;
        max-width: 500px;
        margin: auto;
        grid-template-columns: 1fr 1fr;
        text-align: center;
    }
    .title {
        text-align: center;
        font-size: 2em;
        font-weight: 700;
        grid-column: span 2;
    }
    .clicked {
        color: rgb(0, 0, 0);
    }
    .clicked > img {
        background-color: rgb(123, 230, 57);
    }
    .choose_finish {
        font-weight: 500;
        font-size: xx-large;
        color: rgb(31, 155, 0);
    }
    span {
        font-weight: bold;
        color: dimgray;
    }
    a {
        text-decoration: none;
    }
</style>
