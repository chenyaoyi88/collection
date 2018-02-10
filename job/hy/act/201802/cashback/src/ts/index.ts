import '../sass/index.scss';
import { ajax, Tool, api, weixin } from './util';
import { toast, loading, modal, MsgVcode } from '../components';
import { modalConfig } from './config';

Tool.domReady(() => {
  // 初始化微信 js-sdk 配置，以及分享到朋友圈/好友功能
  weixin.init();

  // 未绑定手机号码
  const oPhone = document.getElementById('phone') as HTMLInputElement;
  const oVcodeInput = document.getElementById('vcode') as HTMLInputElement;

  const oBtnImgPhone = document.getElementById('act-bound-img-phone');

  // modal.show(modalConfig({
  //   code: 'successBind',
  //   phone: '13800138000'
  // }));

  document.body.addEventListener('click', function (ev) {
    const oEvent = ev || event;
    const oTarget = oEvent.srcElement || oEvent.target;

    if (oTarget && oTarget['id']) {
      switch (oTarget['id']) {
        case 'submit-btn':
          // 提交
          submitBind(oPhone, oVcodeInput);
          break;
        case 'download-btn':
          // 下载广货宝
          Tool.appDownload('buyer');
          break;
        default:

      }
    }
  }, false);

  // 获取验证码
  new MsgVcode({
    id: 'msg-vcode',
    class: 'vcode-btn-wrap',
    activeClass: 'active',
    time: 60,
    control: function (oVcode) {
      if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(oPhone.value)) {
        toast('您输入的手机号码格式有误');
        return;
      }

      window
        .fetch(
        'https://www.easy-mock.com/mock/5a682d3d3d63972d717dc4bd/plugins/test/success'
        )
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.code === '0000') {
            console.log('成功');
            oVcode.run();
          }
        });

    }
  });

  getUserInfo();

});

/**
* 获取邀请人红包领取列表
* 
*/
function getUserInfo() {
  loading.show();
  ajax({
    type: 'GET',
    url: api.get,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Tool.getQueryString('authorization') || ''
    },
    success: function (data: any) {
      const oActContentWrap = document.getElementById('act-content-wrap');
      if (!data.isBind) {
        // 如果没绑手机，显示界面1，显示手机号码输入框
        oActContentWrap && oActContentWrap.classList.add('show-act-unbind');
      } else {
        oActContentWrap && oActContentWrap.classList.add('show-act-bound');
        // 已绑定手机号码
        const oListTableRank = document.getElementById('list-tbody-rank');
        // 如果已绑定手机
        oListTableRank.classList.remove('show-rec-main');
        // 显示邀请人红包列表
        oListTableRank.classList.add('show-rec-list');
        if (data.prizes && data.prizes.length) {
          // 如果列表有数据，展示出来
          let sList = '';
          for (let i = 0; i < data.prizes.length; i++) {
            const amount = data.prizes[i].amount;
            const status = data.prizes[i].status;
            sList += `
                          <tr>
                              <td>${amount}元</td>
                              <td>${findStatus(status)}</td>
                          </tr>
                          `;
          }
          oListTableRank.innerHTML = sList;
        }
      }
      loading.hide();
      console.log(data);
    },
    error: function (err: any) {
      loading.hide();
      console.log(err);
      modal.show(modalConfig());
    }
  });
}

/**
 * 匹配返回的状态码相对应的状态
 * 
 * @param {*} status 状态码
 * @returns 
 */
function findStatus(status: any) {
  let sResult = '';
  if (parseInt(status)) {
    const oStatusMap = {
      '10': '已获得',
      '20': '待发送',
      '30': '已发送'
    };
    if (oStatusMap[status]) {
      sResult = oStatusMap[status];
    } else {
      sResult = '未明';
    }
  }
  return sResult;
}

function submitBind(oPhone, oVcodeInput) {
  if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(oPhone.value)) {
    toast('您输入的手机号码格式有误');
    return;
  }

  if (!/^\d{6}$/g.test(oVcodeInput.value)) {
    toast('您输入的验证码格式有误');
    return;
  }

  loading.show();

  ajax({
    type: 'POST',
    url: api.wechatUserBind,
    data: JSON.stringify({
      phone: oPhone.value,
      verificationCode: oVcodeInput.value || '',
      openId: Tool.getQueryString('openId')
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    success: function (data: any) {
      loading.hide();
      modal.show(modalConfig({
        code: data.code,
        phone: oPhone.value
      }));
      console.log(data);
    },
    error: function (err: any) {
      loading.hide();
      console.log(err);
      modal.show(modalConfig());
    }
  });
}