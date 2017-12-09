
import '../sass/index.scss';
import { ajax, devTool, api, weixin, modalConfig } from './tool';
import { $ } from '../vendor';

/**
 * 弹窗
 * 50           50元奖金
 * oversize     您已经完成10次邀请啦
 * focus        请先关注“广货宝”公众号
 * sorry        目前没有可供领取的奖励
 * over         活动已经结束啦，谢谢您的参与！
 * error        网络繁忙，请稍后再试！
 */

const changeStatus = function (statusText: any) {
    let status: string = '';
    switch (String(statusText)) {
        case '-10':
            status = '审核不通过';
            break;
        case '0':
            status = '待审核';
            break;
        case '10':
            status = '已获得';
            break;
        case '20':
            status = '已领取';
            break;
        case '30':
            status = '已发送';
            break;
    }
    return status;
}

devTool.domReady(() => {

    // 初始化微信 js-sdk 配置，以及分享到朋友圈/好友功能
    weixin.init();

    const oRecommend = document.getElementById('recommend');
    // 手机号码提交按钮
    const oBtnSubmit = document.getElementById('submit-btn');
    // 领奖按钮
    const oBtnLing = document.getElementById('ling-btn');
    // 手机号码 wrap
    const oWrapPhone = document.getElementById('phone-wrap');
    // 手机号码输入框
    const oPhone = (document.getElementById('phone') as HTMLInputElement);
    // 邀请人红包列表
    const oList = document.getElementById('rec-list-tbody');

    /**
     * 获取邀请人红包领取列表
     * 
     */
    function getInviterRedpackList() {
        devTool.loading.show();
        $.ajax({
            type: 'GET',
            url: api.findDecInviterRedpackList,
            data: {
                openID: devTool.getQueryString('openId')
            },
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data: FindDecInviterRedpackList_Response) {
                if (!data.bindPhone) {
                    // 如果没绑手机，显示界面1，显示手机号码输入框
                    oWrapPhone.classList.add('show');
                } else {
                    // 如果已绑定手机
                    oRecommend.classList.remove('show-rec-main');
                    // 显示邀请人红包列表
                    oRecommend.classList.add('show-rec-list');
                    if (data.beans && data.beans.length) {
                        // 如果列表有数据，展示出来
                        let sList = '';
                        for (let i = 0; i < data.beans.length; i++) {
                            const inviteePhone = data.beans[i].inviteePhone;
                            const redpackStatus = data.beans[i].redpackStatus;
                            sList += `
                            <tr>
                                <td>${inviteePhone}</td>
                                <td>${changeStatus(redpackStatus)}</td>
                            </tr>
                            `;
                        }
                        oList.innerHTML = sList;
                    }
                }
                devTool.loading.hide();
                console.log(data);
            },
            error: function (err: any) {
                devTool.loading.hide();
                console.log(err);
                devTool.modal.show(modalConfig('500'));
            }
        });
    }

    getInviterRedpackList();

    /**
     * 绑定手机号
     */
    oBtnSubmit.addEventListener('click', function () {

        if (!(/\d{11}/.test(oPhone.value))) {
            devTool.toast('您输入的手机号码格式有误');
            return;
        }

        devTool.loading.show();

        $.ajax({
            type: 'POST',
            url: api.bind,
            data: JSON.stringify({
                phone: oPhone.value,
                openId: devTool.getQueryString('openId')
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data: Bind_Response) {
                // 提交之后？
                devTool.loading.hide();
                getInviterRedpackList();
                console.log(data);
            },
            error: function (err: any) {
                devTool.loading.hide();
                console.log(err);
                devTool.modal.show(modalConfig('500'));
            }
        });

    }, false);

    /**
     * 领取奖励
     */
    oBtnLing.addEventListener('click', function () {
        devTool.loading.show();
        $.ajax({
            type: 'GET',
            url: api.receiveDecInviterRedpack,
            data: {
                openID: devTool.getQueryString('openId')
            },
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data: ReceiveDecInviterRedpack_Response) {
                // 提交之后？
                devTool.loading.hide();
                devTool.modal.show(modalConfig(data.code));
                console.log(data);
            },
            error: function (err: any) {
                devTool.loading.hide();
                console.log(err);
                devTool.modal.show(modalConfig('500'));
            }
        });
    }, false);
});