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

            let marker = new kakao.maps.Marker({
                position: position,
                image: new kakao.maps.MarkerImage(
                    "/img/user_local.png",
                    new kakao.maps.Size(30, 50)
                ),
            });

            marker.setMap(map);
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
        const dom = await requestAPI({ pageNo: 1, numOfRows: 50, zcode: 41 }); // period: 5,

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

        let marker = new kakao.maps.Marker({
            position: position,
            image: new kakao.maps.MarkerImage(
                "/img/ev_local.png",
                new kakao.maps.Size(30, 50)
            ),
        });
        console.log(lat);
        console.log(lng);
        marker.setMap(map);

        // 커스텀 오버레이에 표시할 컨텐츠 입니다
        // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
        // 별도의 이벤트 메소드를 제공하지 않습니다
        let content =
            '<div class="wrap">' +
            '    <div class="info">' +
            '        <div class="title">' +
            "            카카오 스페이스닷원" +
            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' +
            "        </div>" +
            '        <div class="body">' +
            '            <div class="img">' +
            '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">' +
            "           </div>" +
            '            <div class="desc">' +
            '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
            '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
            '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
            "            </div>" +
            "        </div>" +
            "    </div>" +
            "</div>";

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
        let overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition(),
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(marker, "click", function () {
            overlay.setMap(map);
        });

        // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
        function closeOverlay() {
            overlay.setMap(null);
        }
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

    .wrap {
        position: absolute;
        left: 0;
        bottom: 40px;
        width: 288px;
        height: 132px;
        margin-left: -144px;
        text-align: left;
        overflow: hidden;
        font-size: 12px;
        font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
        line-height: 1.5;
    }

    .wrap * {
        padding: 0;
        margin: 0;
    }

    .wrap .info {
        width: 286px;
        height: 120px;
        border-radius: 5px;
        border-bottom: 2px solid #ccc;
        border-right: 1px solid #ccc;
        overflow: hidden;
        background: #fff;
    }

    .wrap .info:nth-child(1) {
        border: 0;
        box-shadow: 0px 1px 2px #888;
    }

    .info .title {
        padding: 5px 0 0 10px;
        height: 30px;
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-size: 18px;
        font-weight: bold;
    }

    .info .close {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #888;
        width: 17px;
        height: 17px;
        background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png");
    }

    .info .close:hover {
        cursor: pointer;
    }

    .info .body {
        position: relative;
        overflow: hidden;
    }

    .info .desc {
        position: relative;
        margin: 13px 0 0 90px;
        height: 75px;
    }

    .desc .ellipsis {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .desc .jibun {
        font-size: 11px;
        color: #888;
        margin-top: -2px;
    }

    .info .img {
        position: absolute;
        top: 6px;
        left: 5px;
        width: 73px;
        height: 71px;
        border: 1px solid #ddd;
        color: #888;
        overflow: hidden;
    }

    .info:after {
        content: "";
        position: absolute;
        margin-left: -12px;
        left: 50%;
        bottom: 0;
        width: 22px;
        height: 12px;
        background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
    }

    .info .link {
        color: #5085bb;
    }
</style>
