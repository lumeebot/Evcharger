<script lang="ts" >
    import { onMount } from "svelte";
    export let charger_type_DC = [false];
    export let charger_type_COMBO = [false];
    export let charger_type_FULL = [false];
    export let charger_type_AC3 = [false];
</script>

<div class="title">
    <h1>타입</h1>
</div>
<div class="container">
    {#each charger_type_AC3 as elm}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() => (charger_type_AC3[0] = !charger_type_AC3[0])}
        >
            <img
                src="/img/charge{0}.png"
                width="200"
                height="200"
                alt="charge{0}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">AC3상</span>
        </div>
    {/each}
    {#each charger_type_FULL as elm}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() => (charger_type_FULL[0] = !charger_type_FULL[0])}
        >
            <img
                src="/img/charge{1}.png"
                width="200"
                height="200"
                alt="charge{1}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">AC완속</span>
        </div>
    {/each}
    {#each charger_type_COMBO as elm}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() => (charger_type_COMBO[0] = !charger_type_COMBO[0])}
        >
            <img
                src="/img/charge{2}.png"
                width="200"
                height="200"
                alt="charge{2}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">DC콤보</span>
        </div>
    {/each}
    {#each charger_type_DC as elm}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {elm ? 'clicked' : ''}"
            on:click={() => (charger_type_DC[0] = !charger_type_DC[0])}
        >
            <img
                src="/img/charge{3}.png"
                width="200"
                height="200"
                alt="charge{3}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">DC</span>
        </div>
    {/each}
</div>
<div class="choose_finish">
    <button onclick="location.href='/server'">선택완료</button>
    <!--a href="/server" style="cursor: pointer;" class="choose_finish">선택완료</a-->
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
        text-align: center;
    }
    .choose_finish button {
        font-size: xx-large;
        background-color:rgb(107, 209, 158);
        color: rgb(233, 22, 22)
    }
    span {
        font-weight: bold;
        color: rgb(84, 145, 49);
    }
    a {
        text-decoration: none;
    }
</style>
