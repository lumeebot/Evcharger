<script lang="ts">
    import { onMount } from "svelte";
    import { requestAPI } from "$lib/api";
    import LIST from "$lib/geo.json";
    import { browser } from "$app/environment";
    console.log(LIST);
    let container: HTMLDivElement;
    let lat: number | any;
    let lng: number | any;
    let useTime: any;
    let statNm: any;
    let addr: any;
    let chgerType: any;
    let stat: any;
    $: level = 6;
    let map: kakao.maps.Map;
    let latitude = 33.450701;
    let longitude = 126.570667;
    let userlat: any;
    let userlng: any;
    const overlayMap = new Map<string, kakao.maps.CustomOverlay>();
    if (browser) {
        /**@ts-ignore*/
        window.map = overlayMap;
    }
    // 커스텀 오버레이에 표시할 컨텐츠 입니다
    // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
    // 별도의 이벤트 메소드를 제공하지 않습니다
    let content = (lat: number, lng: number) =>
        `<div style="    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(60, 80, 100, .25);
    border-radius: 8px;">
            <div class="info">
                <div class="title">
                    <div class="close" onclick="if(window.map.get('${lat},${lng}')) window.map.get('${lat},${lng}').setMap(null)" title="닫기">닫기</div>
                </div>
                <div class="body">
                    <div class="desc">
                        <div class="ellipsis">${addr}</div>
                        <div class="ellipsis">${statNm}</div>
                        <div class="ellipsis">${useTime}</div>
                        <div class="ellipsis">타입 : ${type()}</div>
                        <div class="ellipsis">충전기 상태 : ${chergerStat()}</div>
                    </div>
                    <div class="img">
                        <a href="https://map.kakao.com/link/to/${statNm},${lat},${lng}" target="_blank"><img src="/img/kakao_logo.webp" width="33" height="30"></a>
                   </div>
               </div>
            </div>
        </div>`;
    //////////////////////////////////////////////////////////////////////////////////////////
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
            statNm = t.querySelector("statNm")?.textContent; //충전소 명
            addr = t.querySelector("addr")?.textContent; //소재지 도로명 주소
            chgerType = t.querySelector("chgerType")?.textContent; //충전기 타입
            stat = t.querySelector("stat")?.textContent; //충전기 용량

            // console.log(statNm);
            // console.log(lat);
            // console.log(lng);
            // console.log(chgerType);
            // console.log(stat);
            // console.log("---------------------------------------------------");
            closer();
            getChargerLocation();
        }
    });
    function getUserLocation() {
        if (!navigator.geolocation) {
            throw "위치 정보가 지원되지 않습니다.";
        }
        navigator.geolocation.watchPosition(({ coords, timestamp }) => {
            latitude = coords.latitude; // 위도
            longitude = coords.longitude; // 경도
            userlat = coords.latitude;
            userlng = coords.longitude;
            console.log(userlat);
            console.log(userlng);
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
            return userlat;
        });
    }

    function closer() {
        console.log(LIST.length);
        for (let i = 0; i < LIST.length; i++) {
            const clat = LIST[i].위도;
            const clng = LIST[i].경도;
            console.log(clat);
            console.log(clng);
            console.log(userlat);
            console.log(userlng);
            const distance = (userlat - clat) ** 2 + (userlng - clng) ** 2;
            // if (distance < 7) {
            console.log(distance);
            // }
            console.log("///////////////////////////////////");
        }
    }

    function getChargerLocation() {
        let position = new kakao.maps.LatLng(lat, lng);

        let marker = new kakao.maps.Marker({
            position: position,
            image: new kakao.maps.MarkerImage(
                "/img/ev_local.png",
                new kakao.maps.Size(30, 50)
            ),
        });
        marker.setMap(map);

        // 마커 위에 커스텀오버레이를 표시합니다
        // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
        let overlay = new kakao.maps.CustomOverlay({
            content: content(lat, lng),
            map: map,
            position: marker.getPosition(),
        });
        overlay.setMap(null);
        overlayMap.set(`${lat},${lng}`, overlay);
        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        kakao.maps.event.addListener(marker, "click", function () {
            overlay.setMap(map);
        });
    }

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
    function type() {
        if (chgerType == "01") {
            return "DC 차 데모";
        } else if (chgerType == "02") {
            return "AC 완속";
        } else if (chgerType == "03") {
            return "DC차데모+AC3상";
        } else if (chgerType == "04") {
            return "DC콤보";
        } else if (chgerType == "05") {
            return "DC차데모+DC콤보";
        } else if (chgerType == "06") {
            return "DC차데모+AC3상+DC콤보";
        } else if (chgerType == "07") {
            return "AC3상";
        } else if (chgerType == "89") {
            return "H2";
        }
        return;
    }

    function chergerStat() {
        if (stat == "0") {
            return "알수없음";
        } else if (stat == "1") {
            return "통신이상";
        } else if (stat == "2") {
            return "사용가능";
        } else if (stat == "3") {
            return "충전중";
        } else if (stat == "4") {
            return "운영중지";
        } else if (stat == "5") {
            return "점검중";
        } else if (stat == "9") {
            return "충전소 상태를 찾을 수 없음";
        }
        return;
    }
</script>

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->
<div class="content">
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
</div>

<!-- //////////////////////////////////////////////////////////////////////////////////////////////// -->
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
    .content.hidden {
        opacity: 0;
    }
    .scroll {
        overflow: hidden;
    }
    .scroll::-webkit-scrollbar {
        display: none;
    }
</style>
