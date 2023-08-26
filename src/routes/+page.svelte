<script>
    import { onMount } from "svelte";

    let isClickArr_charger = [false, false, false];
    let isClickArr_charger_DC = [false];
    let isClickArr_wayfast = [false];
    let isClickArr_wayfull = [false];
</script>

<div class="container">
    <div class="title">타입</div>
    {#each isClickArr_charger_DC as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''} LAC"
            on:click={() =>
                (isClickArr_charger_DC[i] = !isClickArr_charger_DC[i])}
        >
            <img
                src="/img/charge{i}.png"
                width="200"
                height="200"
                alt="charge{i}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">AC3상 7핀 </span>
        </div>
    {/each}
    {#each isClickArr_charger_DC as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''} RAC"
            on:click={() =>
                (isClickArr_charger_DC[i] = !isClickArr_charger_DC[i])}
        >
            <img
                src="/img/charge{i + 1}.png"
                width="200"
                height="200"
                alt="charge{i + 1}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">AC단상 5핀</span>
        </div>
    {/each}
    {#each isClickArr_charger_DC as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''} LDC"
            on:click={() =>
                (isClickArr_charger_DC[i] = !isClickArr_charger_DC[i])}
        >
            <img
                src="/img/charge{i + 2}.png"
                width="200"
                height="200"
                alt="charge{i + 2}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">DC콤보 7핀 </span>
        </div>
    {/each}
    {#each isClickArr_charger_DC as elm, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''} RDC"
            on:click={() =>
                (isClickArr_charger_DC[i] = !isClickArr_charger_DC[i])}
        >
            <img
                src="/img/charge{i + 3}.png"
                width="200"
                height="200"
                alt="charge{i + 3}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">DC차 데모 10핀</span>
        </div>
    {/each}

    <table class="t2">
        <tr>
            <td colspan="2">완속</td>
            <td colspan="2">급속</td>
        </tr>
        <tr>
            <td>AC3상 7핀</td>
            <td>AC단상 5핀</td>
            <td>DC콤보 7핀</td>
            <td>DC차 데모 10핀</td>
        </tr>
    </table>
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
        position: fixed;
        bottom: 30%;
        right: 50%;
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
    .t2 {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
    }
    table {
        width: 500px;
    }
    
    .LAC {
        position: fixed;
        left: 35%;
    }
    .LDC {
        position: fixed;
        left: 0;
    }
    .RAC {
        position: fixed;
        right: 0;
    }
    .RDC {
        position: fixed;
        right: 0;
    }
</style>
