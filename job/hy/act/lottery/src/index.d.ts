
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare var wx: any;

declare var pro: any;

interface Ajax<T> {
    // 请求类型
    type: string;
    // 提交的 url 
    url: string;
    //  提交的数据对象
    data?: T;
    //  请求超时时间
    timeout?: number;
    //  需要设置的请求头
    headers?: any;
    //  请求成功回调
    success?: Function;
    //   请求失败回调
    error?: Function;
}

/**
 * 微信js-sdk所需参数
 * 
 * @interface WxJsSdk
 */
interface WxJsSdk {
    appId: string;
    nonceStr: string;
    noncestr: string;
    signature: string
    timestamp: string;
}

/**
 * 微信分享配置
 * 
 * @interface WxConfig
 */
interface WxConfig {
    // 分享标题
    title: string;
    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    link: string;
    // 分享描述
    desc?: string;
    // 分享图标
    imgUrl?: string;
    // 分享类型,music、video或link，不填默认为link
    type?: string;
    // 如果type是music或video，则要提供数据链接，默认为空
    dataUrl?: string;
}

interface Window {
}

// 提交接口
interface Submit {
    // 请求结果
    result: string;
    // 校验状态：
    // 1:成功
    // 2:用户未注册
    // 3:用户未关注公众号
    // 9:活动已结束
    status: number;
    // 红包状态：
    // 1:可抽奖
    // 2:红包已获得，可以领取
    // 3:红包已领取
    // 4:红包已发送
    lotteryStatus: number;
    // 红包金额
    amount: any;
}

// 提交接口
interface Lottery extends Submit { }
// 领奖接口
interface Draw extends Submit { }