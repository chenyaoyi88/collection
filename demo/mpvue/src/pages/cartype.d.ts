/**
 * 禁行时间对象的结构
 * 
 * @interface CarForbiddenTimeResult
 */
interface CarForbiddenTimeResult {
    // 状态 （0: 即将禁行，10：禁行中，20：无禁行）
    status?: number;
    // 	离禁行开始剩余时间(单位：分)
    diffMinute?: number;
    // 离禁行开始剩余时间(单位：毫秒)
    diffMillisecond?: number;
    // 当前服务器时间
    serTime?: Date;
    // 禁行时间列表
    carForbiddenTimeList: {
        id?: number;
        //禁行开始时间
        startTime?: string;
        // 禁行结束时间
        endTime?: string;
        // 状态（0：待审核，10：审核不通过，50：审核通过，-50：已删除）
        status?: number;
    }
}