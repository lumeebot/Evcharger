<script lang="ts">
    import { onMount } from "svelte";
    let container:HTMLDivElement;

    let map:kakao.maps.Map;

    onMount(() => {
        const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.3194789, 126.838415), //지도의 중심좌표.  (사용자 현 위치로 바꿀 것)
            level: 3, //지도의 레벨(확대, 축소 정도)  (확대 수준이 바뀔때마다 업데이트)
        };
        map = new kakao.maps.Map(container, options);
    });
</script>

<!-- {#each Array(15) as _,index}`
    <button on:click={() => map.setLevel(index)}>{index}로 레벨 바꾸기</button>
{/each} -->

<div id="map" bind:this={container} style="width:1536px;height:840px;" />
