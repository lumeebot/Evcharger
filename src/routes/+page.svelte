<script lang="ts">
    import { goto } from "$app/navigation";
    const types = [
        { name: "AC3", toggle: false, text: "AC3상" },
        { name: "FULL", toggle: false, text: "AC완속" },
        { name: "COMBO", toggle: false, text: "DC콤보" },
        { name: "DC", toggle: false, text: "DC" },
    ];
</script>

<head>
    <!-- Google tag (gtag.js) -->
    <!-- Google tag (gtag.js) -->
    <!-- Google tag (gtag.js) -->
    <!-- Google tag (gtag.js) -->
    <!-- Google tag (gtag.js) -->
    <!-- Google tag (gtag.js) -->
    <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-H2D93MS0SJ"
    ></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", "G-H2D93MS0SJ");
    </script>
    <!-- Google Tag Manager -->
    <!-- Google Tag Manager -->
    <!-- Google Tag Manager -->
    <!-- Google Tag Manager -->
    <!-- Google Tag Manager -->
    <script>
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", "GTM-T5JSPZCG");
    </script>
    <!-- End Google Tag Manager -->
</head>

<div class="title">
    <h2>내 근처 충전소 찾기</h2>
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
    <h3>타입 별 기종 예시</h3>
    <div class="example">
        <table>
            <tr>
                <td>AC3상</td>
                <td> 르노삼성의 SM3 </td>
            </tr>
            <tr>
                <td>AC완속</td>
                <td> 르노삼성의 SM3를 제외한 모든 차종 </td>
            </tr>
            <tr>
                <td>DC콤보</td>
                <td>아이오닉5, 코나, EV6, 니로 등</td>
            </tr>
            <tr>
                <td>DC</td>
                <td>기아차 쏘울(2017년 이전 차량) 및 닛산 리프</td>
            </tr>
        </table>
    </div>  
    <button
        on:click={() =>
            goto(
                `/server?active=${JSON.stringify(
                    types.filter((v) => v.toggle).map((v) => v.name) //rest api를 이용해서 서버에 map api를 요청한다
                )}`
            )}>선택완료</button
    >
    <!--a href="/server" style="cursor: pointer;" class="choose_finish">선택완료</a-->
</div>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript
        ><iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T5JSPZCG"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
        /></noscript
    >
    <!-- End Google Tag Manager (noscript) -->
</body>

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
        text-align: center;
    }
    .choose_finish button {
        font-weight: 500;
        font-size: xx-large;
        background-color: rgb(47, 216, 134);
        color: rgb(255, 255, 255);
    }
    span {
        font-weight: bold;
        color: rgb(123, 231, 61);
    }
    h2 {
        margin: auto;
    }
    h3 {
        margin: auto;
    }
    table{
        text-align: center;
        margin: auto;
        border-collapse: collapse;
    }
    tr{
        border: 1px solid black;
    }
    td{
        border: 1px solid black;

    }
    button{
        margin: 1;
    }
</style>    