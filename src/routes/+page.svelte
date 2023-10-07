<script lang="ts">
    import { goto } from "$app/navigation";
    const types = [
        { name: "AC3", toggle: false, text: "AC3상" },
        { name: "FULL", toggle: false, text: "AC완속" },
        { name: "COMBO", toggle: false, text: "DC콤보" },
        { name: "DC", toggle: false, text: "DC" },
    ];
</script>

<div class="title">
    <h2>타입을 선택하세요</h2>
</div>
<div class="container">
    {#each types as { name, toggle, text }, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="type {toggle ? 'clicked' : ''}"
            on:click={() => (toggle = !toggle)}
        >
            <img
                src="/img/charge{i}.png"
                width="200"
                height="200"
                alt="charge_{name}"
                style="cursor: pointer;"
            /><br />
            <span style="cursor: pointer;">{text}</span>
        </div>
    {/each}
</div>
<div class="choose_finish">
    <button
        on:click={() =>
            goto(
                `/server?active=${JSON.stringify(
                    types.filter((v) => v.toggle).map((v) => v.name)    //rest api를 이용해서 서버에 map api를 요청한다
                )}`
            )}>선택완료</button
    >
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
        color: rgb(105, 248, 69);
        text-align: center;
    }
    .choose_finish button {
        font-size: xx-large;
        background-color: rgb(47, 216, 134);
        color: rgb(255, 255, 255);
    }
    span {
        font-weight: bold;
        color: rgb(123, 231, 61);
    }
    a {
        text-decoration: none;
    }
</style>
