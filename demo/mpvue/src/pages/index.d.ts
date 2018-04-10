interface GHB_Response<T> {
    // 数据
    data: T;
    // 信息（就算是成功也有信息）
    errMsg: string;
    // 头部信息
    header: any;
    // 状态值
    statusCode: number;
}

interface Vcode_Request {
    // 手机号码，11位长度数字字符串
    mobile: string;
    // 验证码类型：0、登录验证码 1 交易密码设置验证码 2 仓库密码设置验证码、 4 银行卡设置验证码。注意：为了兼容之前的代码，不填写类型的时候默认为登录验证码，所以发送其他类型验证码的时候必须要填写类型
    type?: number;
}

interface Vcode_Response {
    // 验证码（测试环境才有该字段）
    code: string;
    // 过期时间
    expireTime?: number;
    // id
    id?: number;
    // mobile
    mobile?: string;
    // 是否需要输入邀请码 (布尔类型)
    showInvite?: boolean;
    // token
    token?: any;
    // 验证码类型
    type?: number;
}

/**
 * 登录-请求参数
 * 
 * @interface Login_Request
 */
interface Login_Request {
    // 手机号码
    username: string;
    // 短信验证码
    validcode: string;
    // 设备编码
    deviceId: string;
    // 设备类型 1 = android， 2 = ios
    deviceType: number;
    // 邀请码
    code?: string;
    // 经度
    longitude?: number;
    // 纬度
    latitude?: number;
}

/**
 * 登录-返回数据
 * 
 * @interface Login_Response
 */
interface Login_Response {
    // token
    token?: string;
    // 401 失败
    code?: number;
    // 校验出错的字段名称和对应的错误
    fieldErrors?: any;
    // 错误信息
    message?: string;
    // 状态码（貌似和code 返回的是一样的）
    status?: number;
}
