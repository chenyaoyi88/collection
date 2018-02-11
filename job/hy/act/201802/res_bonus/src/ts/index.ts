import '../sass/index.scss';
import { ajax, Tool, api, weixin, formatDate } from './util';
import { toast, loading, modal, MsgVcode } from '../components';
import { modalConfig } from './config';
import { Res_Bound } from './index.bound';

Tool.domReady(() => {
  // 初始化微信 js-sdk 配置，以及分享到朋友圈/好友功能
  weixin.init();

  getUserInfo();

  // 未绑定手机号码
  const oPhone = document.getElementById('phone') as HTMLInputElement;
  const oVcodeInput = document.getElementById('vcode') as HTMLInputElement;

  const oBtnSubmit = document.getElementById('submit-btn');

  oBtnSubmit && oBtnSubmit.addEventListener('click', function (ev) {
    submitBind(oPhone.value, oVcodeInput.value);
  }, false);

  // 获取验证码
  const oMsgVcode = new MsgVcode({
    id: 'msg-vcode',
    class: 'vcode-btn-wrap',
    activeClass: 'active',
    control: function (oVcode) {

      if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(oPhone.value)) {
        toast('您输入的手机号码格式有误');
        return;
      }

      ajax({
        type: 'POST',
        url: api.verificationCode,
        data: JSON.stringify({
          mobile: oPhone.value,
          type: 3
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        success: function (data: any) {
          toast('验证码已发送，请注意查收');
          oVcode.run();
        },
        error: function (err: any) {
          console.log(err);
          modal.show(modalConfig());
        }
      });

    }
  });


  /**
   * 获取邀请人红包领取列表
   * 
   * @returns true 不往下执行，false 执行未绑定逻辑
   */
  function getUserInfo() {
    const oActContentWrap = document.getElementById('act-content-wrap');
    if (Tool.getQueryString('_ghb_p_if') && Tool.getQueryString('_ghb_p_if').indexOf('true') !== -1) {

      bindSuccess(oActContentWrap);

      return true;
    } else {
      // 没绑定
      oActContentWrap && oActContentWrap.classList.add('show-act-unbind');
      return false;
    }

  }

  function bindSuccess(oActContentWrap) {
    loading.show();
    ajax({
      type: 'GET',
      url: api.get,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res: Res_Bound) {
        loading.hide();
        // 已绑定手机号码
        if (res) {
          if (res.code === 'UN_BIND') {
            oActContentWrap && oActContentWrap.classList.add('show-act-unbind');
            return false;
          } else if (res.code === 'SUCCESS') {

            if (oActContentWrap) {
              oActContentWrap.classList.remove('show-act-unbind');
              oActContentWrap.classList.add('show-act-bound');
            }
            if (!res.data) return;

            if (res.data.mobile) {
              const oBtnImgPhone = document.getElementById('act-bound-img-phone');
              oBtnImgPhone && (oBtnImgPhone.innerHTML = res.data.mobile);
            }

            if (res.data.prizes && res.data.prizes.length) {
              const oListTableRank = document.getElementById('list-tbody-rank');
              // 如果已绑定手机
              oListTableRank && oListTableRank.classList.remove('show-rec-main');
              // 显示邀请人红包列表
              oListTableRank && oListTableRank.classList.add('show-rec-list');
              // 如果列表有数据，展示出来
              let sList = '';
              const aPrizes = res.data.prizes;
              for (let i = 0; i < aPrizes.length; i++) {
                const amount = aPrizes[i].amount || '--';
                const time = formatDate(aPrizes[i].winningTime);
                const status = findStatus(aPrizes[i].status) || '--';
                sList += `
              <tr>
                  <td>${amount} 元</td>
                  <td>${time.month}月${time.date}日  ${status}</td>
              </tr>
              `;
              }
              oListTableRank && (oListTableRank.innerHTML = sList);
            }

          }
        }
        console.log(res);
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
      }
    }
    return sResult;
  }


  /**
   * 提交绑定
   * 
   * @param {string} oPhone 手机号码
   * @param {string} oVcodeInput 验证码
   * @returns 
   */
  function submitBind(oPhone: string, oVcodeInput: string): boolean {
    if (!/^1[3-9][0-9]{9}$|^[0-9]{8}$/g.test(oPhone)) {
      toast('您输入的手机号码格式有误');
      return false;
    }

    if (!(/\d+/g.test(oVcodeInput))) {
      toast('您输入的验证码格式有误');
      return false;
    }

    loading.show();

    ajax({
      type: 'POST',
      url: api.wechatUserBind,
      data: JSON.stringify({
        phone: oPhone,
        verificationCode: oVcodeInput || '',
        openId: Tool.getQueryString('openId')
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res: any) {
        console.log(res);
        loading.hide();

        if (res.code === 'SUCCESS') {
          modal.show(modalConfig({
            code: res.code,
            phone: oPhone,
            confirmCallback: function () {
              bindSuccess(document.getElementById('act-content-wrap'));
            }
          }));
        } else if (res.code === 'UN_REGISTERED') {
          modal.show(modalConfig({
            code: res.code,
            phone: oPhone,
            confirmCallback: function () {
              Tool.appDownload('buyer');
            }
          }));
        } else {
          modal.show(modalConfig({
            code: res.code
          }));
        }

      },
      error: function (err: any) {
        loading.hide();
        console.log(err);
        modal.show(modalConfig());
      }
    });
  }

  function showDetailList() {
    modal.show({
      modalClass: `modal-act-table`,
      content: `
          <div class="modal-table-wrap">
            <table class="list-table">
                <thead>
                    <tr>
                        <th>被邀请人</th>
                        <th>完成订单时间</th>
                        <th>返现金额</th>
                    </tr>
                </thead>
                <tbody id="list-tbody-modal">
                  <td colspan="3">暂无数据</td>
                </tbody>
            </table>
          </div>
          `,
      confirmText: '我知道了',
      isShowAnimate: true
    });
  }

});


