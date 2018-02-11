interface Res_Bound {
    // 返回状态码：SUCCESS:成功 FAIL:失败
    code: string;
    // 返回信息
    msg: string;
    // 返回数据
    data?: {
        // 可抽奖次数
        canLotteryTimes?: number,
        mobile: string,
        // 	是否已绑定微信
        isBind?: true,
        prizes?: Array<Res_Bound_Prizes>
    }
}

interface Res_Bound_Prizes {
    // 中奖金额(单位：元)
    amount?: number,
    // 中奖时间
    winningTime?: Date,
    // 状态：10:已获得 20:待发送 30:已发送
    status?: 10
}

export { Res_Bound, Res_Bound_Prizes };