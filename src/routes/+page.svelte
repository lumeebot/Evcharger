<script>
    import { onMount } from "svelte";

    let isClickArr_charger = [false, false, false];
    let isClickArr_charger_DC = [false];
    let isClickArr_wayfast = [false];
    let isClickArr_wayfull = [false];
</script>

<div class="container">
    <div class="title">타입</div>
    {#each isClickArr_charger as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() => (isClickArr_charger[i] = !isClickArr_charger[i])}
        >
            <img
                src="/img/charge{i}.png"
                width="200"
                height="200"
                alt="charge{i}"
            /><br />
            <span>AC/DC</span>
        </div>
    {/each}
    {#each isClickArr_charger_DC as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() =>
                (isClickArr_charger_DC[i] = !isClickArr_charger_DC[i])}
        >
            <img
                src="/img/charge{i + 3}.png"
                width="200"
                height="200"
                alt="charge{i + 3}"
            /><br />
            <span>DC</span>
        </div>
    {/each}

    {#each isClickArr_wayfast as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() => (isClickArr_wayfast[i] = !isClickArr_wayfast[i])}
        >
            <img
                src="/img/charge_way{i}.png"
                width="200"
                height="120"
                alt="charge_way{i}"
            /><br />
            <span>급속</span>
        </div>
    {/each}
    {#each isClickArr_wayfull as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() => (isClickArr_wayfull[i] = !isClickArr_wayfull[i])}
        >
            <img
                src="/img/charge_way{i + 1}.png"
                width="200"
                height="120"
                alt="charge_way{i + 1}"
            /><br />
            <span>완속</span>
        </div>
    {/each}

    <div />
    <!-- <div class="choose_finish">선택완료</div> -->

    <a href="http://localhost:5173/server" class="choose_finish">선택완료</a>
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
</style>
