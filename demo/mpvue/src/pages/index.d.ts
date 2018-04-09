
interface Index_goBackData {
    // 联系人
    name: string;
    // 联系电话
    mobile: string;
    // 位置信息
    // 参考地址：http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-placeapi
    sitePoint: Baidu_Search_Res
}

interface Baidu_Search_Res {
    // poi名称
    name: string;
    // 详细地址
    address: string;
    // 区
    area: string;
    // 是否有详情页：1有，0没有
    detail: number;
    // poi经纬度坐标
    location: {
        // 纬度值
        lat: float;
        // 经度值
        lng: float;
    };
    // 省份
    province: string;
    // poi的唯一标示
    uid: string;
}