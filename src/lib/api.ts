interface iRequestAPI {
    pageNo: number;
    numOfRows: number;
    // period:number;
    zcode?: string | number;
    zscode?:number | undefined;
}
export const requestAPI = async (obj: iRequestAPI) => {
    // let url = 'http://apis.data.go.kr/B552584/EvCharger/getChargerStatus'; /*URL*/
    const url = new URL('https://apis.data.go.kr/B552584/EvCharger/getChargerInfo');
    // 서비스키
    url.searchParams.append('serviceKey', 'V1eEuRvqApUSfQZV0OD7hipwnjfd+sSgQvhboyJiuRP/7ioB0DMhINkxhkEylCgQjtOw+uwJ23mPCAEC5Gg8Xw==');
    url.searchParams.append('pageNo', String(obj.pageNo));
    url.searchParams.append('numOfRows', String(obj.numOfRows));
    // url.searchParams.append('period', String(obj.period));
    // url.searchParams.append('zcode', String(obj.zcode));
    url.searchParams.append('zscode', String(obj.zscode));
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const result = parser.parseFromString(text, 'application/xml')
    console.log(result)
    return result;
}