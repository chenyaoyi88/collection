declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare var wx: any;

interface Window {
}

interface ShowModal {
    // 要现实的文本
    content: string;
    // modal 另外添加的样式名
    modalClass?: string;
    // modalWrap 另外添加的样式名
    modalWrapClass?: string;
    // textWrap 另外添加的样式名
    textWrapClass?: string;
    // contentWrap 另外添加的样式名
    contentWrapClass?: string;
    // 确定按钮文字
    confirmText?: string;
    // 确定按钮自定义
    confirmHtml?: string;
    // 确定按钮回调
    confirmCallback?: Function;
    // 关闭按钮回调
    closeCallback?: Function;
}

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
    header?: any;
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

/**
 * 绑定邀请人手机号码
 * 
 * @interface Bind_Response
 */
interface Bind_Response {
    // 邀请人id
    id?: number;
    // 手机号码
    phone?: string;
    // 微信openId
    openid?: string;
    // 是否满额
    fulfilled?: boolean;
    // 生成者id
    createdBy?: number;
    // 生成时间
    createdDate?: any;
    // 修改者id
    modifiedBy?: number;
    // 修改时间
    modifiedDate?: any;
}

/**
 * 获取邀请人红包领取列表
 * 
 * @interface FindDecInviterRedpackList_Response
 */
interface FindDecInviterRedpackList_Response {
    // 是否绑定手机，如果返回的bindphone字段为false则代表没绑手机号
    bindPhone: boolean;
    // 邀请人红包列表信息
    beans?: [
        {
            // 被邀请人手机
            inviteePhone?: string;
            // 红包状态
            redpackStatus?: number;
        }
    ]
}

/**
 * 领取邀请人红包
 * 
 * @interface ReceiveDecInviterRedpack_Response
 */
interface ReceiveDecInviterRedpack_Response {
    code: string;
    message: string;
    /**
     * 
        000 成功
        500 失败系统内部异常
        001 失败1-无奖励
        002 失败2-无奖励，已领取奖励>=10 
        003 失败3-没有关注公众号
        004 失败4-存在多个邀请人
     */
}
