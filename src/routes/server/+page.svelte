<script lang="ts">
    import { onMount } from "svelte";
    let container: HTMLDivElement;

    let map: kakao.maps.Map;
    let latitude = 33.450701;
    let longitude = 126.570667;
    function getUserLocation() {
        if (!navigator.geolocation) {
            throw "위치 정보가 지원되지 않습니다.";
        }
        navigator.geolocation.watchPosition(({ coords, timestamp }) => {
            latitude = coords.latitude; // 위도
            longitude = coords.longitude; // 경도
            let position = new kakao.maps.LatLng(latitude, longitude);
            let maker = new kakao.maps.Marker({
                position,
                image: new kakao.maps.MarkerImage(
                    "/img/user_local.png",
                    new kakao.maps.Size(30, 50)
                ),
            });
            maker.setMap(map);
            map.setCenter(position);
        });
    }

    onMount(() => {
        const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.  (사용자 현 위치로 바꿀 것)
            level: 3, //지도의 레벨(확대, 축소 정도)  (확대 수준이 바뀔때마다 업데이트)
        };
        map = new kakao.maps.Map(container, options);
        console.log(map);
        getUserLocation();
    });
    location.reload();

</script>

<div id="map" bind:this={container} />
<div style="position: fixed; top:0; left:0; z-index:2">
    위도 : {latitude}, 경도 : {longitude}
</div>
<a
    style="position: fixed; top:0; right:0; z-index:2"
    href="https://evcharger.vercel.app/">🔙</a
>

<style>
    #map {
        width: 100vw;
        height: 100vh;
    }
    a{
        width: 100px;
        height: 100px;
    }
</style>
