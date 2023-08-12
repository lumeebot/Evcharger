<script lang="ts">
    import { onMount } from "svelte";
    import { requestAPI } from "$lib/api";
    let container: HTMLDivElement;
    let lat: number | any;
    let lng: number | any;
    let useTime;
    $: level = 3;
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

            let userMaker = new kakao.maps.Marker({
                position: position,
                image: new kakao.maps.MarkerImage(
                    "/img/user_local.png",
                    new kakao.maps.Size(30, 50)
                ),
            });

            userMaker.setMap(map);
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
        const dom = await requestAPI({ pageNo: 1, numOfRows: 10, zcode: 41 }); // period: 5,

        for (const t of dom.querySelectorAll("item")) {
            lat = t.querySelector("lat")?.textContent; //위도
            lng = t.querySelector("lng")?.textContent; //경도
            useTime = t.querySelector("useTime")?.textContent; //사용가능 시간
            console.log(lat);
            console.log(lng);
            console.log("---------------------------------------------------");
            getChargerLocation();
        }
    });
    function zoomIn() {
        // 현재 지도의 레벨을 얻어옵니다
        level = map.getLevel();
        map.setLevel(level - 1);
    }

    function zoomOut() {
        // 현재 지도의 레벨을 얻어옵니다
        level = map.getLevel();
        map.setLevel(level + 1);
    }
    const reload = () => {
        window.location.reload();
    };
    function getChargerLocation() {
        let position = new kakao.maps.LatLng(lat, lng);

        let chergerMaker = new kakao.maps.Marker({
            position: position,
            image: new kakao.maps.MarkerImage(
                "/img/ev_local.png",
                new kakao.maps.Size(30, 50)
            ),
        });
        console.log(lat);
        console.log(lng);
        chergerMaker.setMap(map);
    }
</script>

<div id="map" bind:this={container} />
<div style="position: fixed; top:0; left:0; z-index:2" class="bacolor">
    위도 : {latitude}, 경도 : {longitude}
</div>

<div class="cl">
    <a on:click={reload} style="cursor: pointer;">[새로고침]</a>
    <br />
    <a href="../" class="focl" style="cursor: pointer;">[BACK]</a>
</div>
<div
    style="position: fixed; bottom:0; right:0; z-index:2;cursor: pointer;"
    class="maplevel bacolor"
>
    <span on:click={zoomIn}>+</span>
    /
    <span on:click={zoomOut}>-</span>
</div>

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
        height: auto;
        width: auto;
        color: black;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 2;
        text-align: right;
    }
    .bacolor {
        /* background-color: whitesmoke; */
    }
    .maplevel {
        width: auto;
        height: auto;
        text-align: center;
        font-size: xx-large;
    }
    .focl {
        color: black;
    }
</style>
