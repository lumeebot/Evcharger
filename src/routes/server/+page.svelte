<script lang="ts">
    import { onMount } from "svelte";
    import { requestAPI } from "$lib/api";
    import LIST from "$lib/geo.json";
    import LIST_NUM from "$lib/geo_num.json";
    import { browser } from "$app/environment";
    import { page } from "$app/stores";

    const actives = JSON.parse($page.url.searchParams.get("active") ?? "[]");   //JSON.parse로 가져왔다.
    // console.log(actives);
    // import MYMAP from "../+page.svelte";
    // console.log(LIST);
    // console.log(LIST_NUM);
    let num: number;
    let container: HTMLDivElement;
    let lat: number | any;
    let lng: number | any;
    let useTime: any;
    let statNm: any;
    let addr: any;
    let chgerType: any;
    let stat: any;
    $: level = 3;
    let map: kakao.maps.Map;  
    let latitude = 33.450701;
    let longitude = 126.570667;
    let userlat: any;
    let userlng: any;
    let nearLocationList: any[] = [];
    const overlayMap = new Map<string, kakao.maps.CustomOverlay>();
    let min;
    let minLocation; //가장 가까운 거리
    let min_city: any;
    let filteringList: any[];

    // console.log("MyMap", MYMAP);
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
                        <a href="https://map.kakao.com/link/to/${statNm},${lat},${lng}" target="_blank"><img src="/img/kakao_logo.webp" width="33" height="30"><span>길안내</span></a>
                   </div>
               </div>
            </div>
        </div>`;

    onMount(async () => {
        const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.  (사용자 현 위치로 바꿀 것)
            level: level, //지도의 레벨(확대, 축소 정도)  (확대 수준이 바뀔때마다 업데이트)
        };
        map = new kakao.maps.Map(container, options);
        // console.log("맵");
        // console.log(map);
        // console.log("///////////////////////");
        await getUserLocation();

        const myLocDOM = await closer();
        // console.log(myLocDOM);
        for (const t of myLocDOM.querySelectorAll("item")) {
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

            getChargerLocation();
        }
    });
    async function getUserLocation() {
        if (!navigator.geolocation) {
            throw "위치 정보가 지원되지 않습니다.";
        }
        await new Promise(
            (
                res //promise 객체 (찾아보기)
            ) =>
                navigator.geolocation.getCurrentPosition(
                    ({ coords, timestamp }) => {
                        latitude = coords.latitude; // 위도
                        longitude = coords.longitude; // 경도
                        userlat = coords.latitude;
                        userlng = coords.longitude;
                        let position = new kakao.maps.LatLng(
                            latitude,
                            longitude
                        );

                        let marker = new kakao.maps.Marker({
                            position: position,
                            image: new kakao.maps.MarkerImage(
                                "/img/user_local.png",
                                new kakao.maps.Size(30, 50)
                            ),
                        });

                        marker.setMap(map);
                        map.setCenter(position);
                        res(null);
                        return userlat;
                    }
                )
        );
    }
    function filtering() {
        filteringList = [];
        if (actives.indexOf("AC3") > -1) {
            filteringList.push("07");
        }
        if (actives.indexOf("FULL") > -1) {
            filteringList.push("02");
        }
        if (actives.indexOf("COMBO") > -1) {
            filteringList.push("04");
        }
        if (actives.indexOf("DC") > -1) {
            filteringList.push("01");
        }
        if (actives.indexOf("DC") > -1 || actives.indexOf("COMBO") > -1) {
            filteringList.push("05");
        }
        if (actives.indexOf("DC") > -1 || actives.indexOf("AC3") > -1) {
            filteringList.push("03");
        }
        if (
            actives.indexOf("DC") > -1 ||
            actives.indexOf("COMBO") > -1 ||
            actives.indexOf("AC3") > -1 
        ) {
            filteringList.push("06");
        }
        // console.log(filteringList);
    }
    filtering();
    function closer() {
        for (let i = 0; i < LIST.length; i++) {
            const clat = LIST[i].latitude;
            const clng = LIST[i].longitude;
            // console.log(clat);
            // console.log(clng);
            const distance = (userlat - clat) ** 2 + (userlng - clng) ** 2;
            // if (distance < 7) {
            nearLocationList[i] = distance;
            // }
        }
        min = Math.min.apply(null, nearLocationList);
        minLocation = nearLocationList.indexOf(min);
        min_city = LIST[minLocation].city;
        // let car = cars.find(car => car.color === "red");
        let found:
            | {
                  zscode: number;
                  city: string;
              }
            | undefined = LIST_NUM.find((e) => e.city === min_city);
        let found_city = {
            zscode: found?.zscode,
            pageNo: 1,
            numOfRows: 500,
        };
        return requestAPI(found_city);
    }

    function getChargerLocation() {
        if (filteringList.indexOf(chgerType) > -1) {
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
        // else {
        //     // console.log("this is not right");
        // }
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

<head>
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

<div class="loading-overlay" id="loadingOverlay">
    <div class="loading-spinner" />
</div>
<div class="content">
    <div id="map" bind:this={container} />
    <div style="position: fixed; top:0; left:0; z-index:2" class="bacolor">
        위도 : {latitude}, 경도 : {longitude}
    </div>

    <div class="cl">
        <a on:click={reload} style="cursor: pointer;">[새로고침]</a>
        <br />
        <a href="../" class="focl" style="cursor: pointer;">[뒤로가기]</a>
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
    #map {
        width: 100vw;
        height: 100vh;
    }
    a {
        width: 100px;
        height: 100px;
        font-size: xx-large;
        text-decoration: none;
        text-decoration-line: none;
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
    .maplevel {
        width: auto;
        height: auto;
        text-align: center;
        font-size: xx-large;
    }
    .focl {
        color: black;
    }
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        display: none; /* Initially hidden */
    }

    .loading-spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    .content {
        opacity: 1;
        transition: opacity 0.5s;
    }
</style>
