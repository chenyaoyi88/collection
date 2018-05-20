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

/**
 * 计算运费（API：http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-05%20%E8%AE%A1%E7%AE%97%E8%BF%90%E8%B4%B9）
 *
 * @interface CalcCost_Request
 */
interface CalcCost_Request {
  // 始发地经度（lng）
  senderX: number;
  // 始发地纬度（lat）
  senderY: number;
  // 目的地经度（lng）
  receiverX: number;
  // 目的地纬度（lat）
  receiverY: number;
  // 车型Id 整型
  vehicleTypeId: number;
  // 支付方式：1: 立刻支付 2: 货到付款
  paymentType: number;
  // 是否预定：是: "Y" 否: "N"
  isBooking: string;
  // 预定时间：yyyy - MM - dd HH: mm: ss，没有则填null
  bookingTime: any;
  // 优惠券码的ID（从优惠券列表选择的优惠券的id）
  couponCodeId?: any;
  // 是否购买保险，true：购买 false：不购买
  isBuyInsurance: boolean;
  // 货物价值（保额），当isBuyInsurance为ture需要填
  coverage?: any;
  // 发货城市code，当isBuyInsurance为ture需要填
  startCityCode?: any;
  // 收货城市code，当isBuyInsurance为ture需要填
  endCityCode?: any;
  // 订单类型，默认普通订单（1：普通订单 2: 循环线订单）
  type?: number;
  // 布匹条数，默认0条
  clothsAmount?: number;
  // 是否需要装卸，默认不需要装卸（false：不需要 true: 需要）
  needLoading?: boolean;
  // 中途点List
  halfways?: any;
}

interface CalcCost_Response {
  // 运费金额，
  // 普通订单：不包括保险金额（即：zpt运费－优惠劵金额）
  // 循环线订单：不包括保险金额，（即：循环线运费－优惠劵金额）
  amount?: number;
  // zpt运费
  zptFreight?: number;
  // 夜间服务费
  nightServiceFee?: number;
  // 预计里程
  dist: number;
  // 优惠劵金额
  couponAmount?: any;
  // 保险费
  insuranceAmount?: any;
  // 车型
  carType?: string;
}

/**
 * 下单（API：http://192.168.7.90:8899/API_%E5%95%86%E5%AE%B6APP/10%20%E7%89%A9%E6%B5%81/10-08%20%E4%B8%8B%E5%8D%95）
 *
 * @interface Logisticsorder_Request
 */
interface Logisticsorder_Request {
  // 发货方地址名称
  senderSiteName?: string;
  // 发货方地址详细信息
  senderAddressName: string;
  // 发货方手写地址
  senderStreet?: string;
  // 发货方地址经度
  senderX: number;
  // 发货方地址纬度
  senderY: number;
  // 发货人手机号 非空，11位手机号格式或者8位固话
  senderPhone: string;
  // 发货人姓名
  senderContact: string;
  // 接收方地址名称
  receiverSiteName?: string;
  // 接收方地址详细信息
  receiverAddressName: string;
  // 接收方手写地址
  receiverStreet?: string;
  // 接收方经度
  receiverX: number;
  // 接收方纬度
  receiverY: number;
  // 接受方联系电话 非空，11位手机号格式或者8位固话
  receiverPhone: string;
  // 接收方联系人
  receiverContact: string;
  // 货物信息
  goodsDesc: string;
  // 车型Id（从车型列表获取）
  vehicleTypeId: number;
  // 优惠券码的ID（从优惠券列表选择的优惠券的id）
  couponCodeId?: number;
  // 支付类型（1：立即支付 2: 到付）
  paymentType: number;
  // 是否预约（true：预约 false: 不预约）
  isBooking: boolean;
  // 预约时间，当isBooking为true时，需要填这个字段(格式：yyyy - MM - dd HH: mm: ss)
  bookingTime?: string;
  // 是否购买保险（0：不购买 1: 购买）
  insuranceStatus: number;
  // 当insuranceStatus为1时，需要填该字段
  insuranceOrder?: any;
  // 额外服务列表
  listOfAdditionalRequest?: any;
  // 订单类型，默认普通订单（1：普通订单 2: 循环线订单）
  type?: number;
  // 布匹条数，默认0条
  clothsAmount?: number;
  // 是否需要装卸，默认不需要装卸（false：不需要 true: 需要）
  needLoading?: boolean;
  // 客户端生成的 UUID
  uuid: string;
  // 中途点List
  halfways?: Array<any>;
  // 发货城市code，当isBuyInsurance为ture需要填
  startCityCode?: any;
  // 收货城市code，当isBuyInsurance为ture需要填
  endCityCode?: any;
}

interface WX_UserInfo {
  // 错误信息
  errMsg?: string;
  // 原始数据格式（字符串）
  rawData?: string;
  // signature
  signature?: any;
  // 用户信息
  userInfo?: {
    // 用户头像
    avatarUrl?: string;
    // 城市
    city?: string;
    // 男：1，女：2
    gender?: number;
    // 用户昵称
    nickName?: string;
    // 省份
    province?: string;
  };
}

interface LogisticsCoupons_Request {
  // 始发地经度
  senderX: number;
  // 始发地纬度
  senderY: number;
  // 目的地经度
  receiverX: number;
  // 目的地纬度
  receiverY: number;
  // 车型Id（从车型列表获取）
  vehicleTypeId: numberl;
  // 订单类型：1 - 付即送, 2 - 普通物流
  orderType: number;
  // 中途点List(非必须)
  halfways?: any;
}

interface Halfways {
  // 纬度 lat
  x: any;
  // 经度
  y: any;
  phone: string;
  siteName?: string;
  addressName?: string;
  street?: string;
  contact?: string;
}
