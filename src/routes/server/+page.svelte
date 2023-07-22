<script lang="ts">
    import { onMount } from "svelte";
    import { requestAPI } from "$lib/api";
    let container: HTMLDivElement;

    let level = 3;
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

    onMount(async () => {
        const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.  (사용자 현 위치로 바꿀 것)
            level: level, //지도의 레벨(확대, 축소 정도)  (확대 수준이 바뀔때마다 업데이트)
        };
        map = new kakao.maps.Map(container, options);
        console.log(map);
        getUserLocation();
        const dom = await requestAPI({ pageNo: 1, numOfRows: 10, zcode: 11 }); // period: 5,
        for (const t of dom.querySelectorAll("item")) {
            console.log(t.querySelector("lat")?.textContent);
        }
    });
</script>

<div id="map" bind:this={container} />
<div style="position: fixed; top:0; left:0; z-index:2" class="bacolor">
    위도 : {latitude}, 경도 : {longitude}
</div>
<a class="cl" href="../">뒤로</a>

<style>
    #map {
        width: 100vw;
        height: 100vh;
    }
    a {
        width: 100px;
        height: 100px;
        font-size: xx-large;
        text-decoration: none;
    }
    .cl {
        width: 70px;
        color: black;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 2;
    }
    .bacolor {
        background-color: whitesmoke;
    }
</style>
