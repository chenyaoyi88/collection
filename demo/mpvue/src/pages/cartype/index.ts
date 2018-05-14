import { Vue, Component, Provide } from 'vue-property-decorator';
import { goBackSetData, ghbRequest, zerofillBack } from '../../utils';
import API from '../../api';

import text_forbid_red from '../../../static/images/text_forbid_red.png';
import text_forbid_yellow from '../../../static/images/text_forbid_yellow.png';
import text_load from '../../../static/images/text_load.png';
import text_night from '../../../static/images/text_night.png';
import text_size from '../../../static/images/text_size.png';
import arrow from '../../../static/images/arrow.png';

// 必须使用装饰器的方式来指定components
@Component
class Index extends Vue {

  carTypeList: Array<any> = [];

  img: any = {
    text_forbid_red,
    text_forbid_yellow,
    text_load,
    text_night,
    text_size,
    arrow
  };

  onLoad() {
    // 如果没有车型列表
    // if (!this.$store.state.carTypeList.length) {
      wx.showLoading({
        title: '加载中'
      });
      // 获取车型列表
      ghbRequest({
        url: API.CARTYPE
      }).then((res: any) => {
        if (res.statusCode === 200) {
          if (res.data.length) {

            this.carTypeList = res.data;

            for (let item of this.carTypeList) {
              item.startPrice = (item.startPrice && zerofillBack(item.startPrice)) || '--';
              item.startRange = (item.startPrice && zerofillBack(item.startRange)) || '--';
              item.nightServiceFee = (item.nightServiceFee && zerofillBack(item.nightServiceFee)) || '--';
              if (item.carTemplate) {
                if (item.carTemplate.carForbiddenTimeResult) {
                  const result = item.carTemplate.carForbiddenTimeResult;
                  item.forbiddenStatusCode = item.carTemplate.carForbiddenTimeResult.status;
                  item.forbiddenStatusText = this.getForbiddenStatus(result).text;
                  item.forbiddenStatusClass = this.getForbiddenStatus(result).class;
                } else {
                  // 没有 carForbiddenTimeResult 字段的值时的默认状态
                  item.forbiddenStatusCode = 20;
                  item.forbiddenStatusText = '无禁行';
                  item.forbiddenStatusClass = 'green';
                }
              }
            }

          }
        }
      });
    // }
  }

  // get carTypeData() {
  //   console.log(this.$store.state.carTypeList);
  //   return this.$store.state.carTypeList;
  // }

  // // 二次处理数组
  // get carTypeList() {
  //   for (let item of this.carTypeData) {
  //     item.startPrice = (item.startPrice && zerofillBack(item.startPrice)) || '--';
  //     item.startRange = (item.startPrice && zerofillBack(item.startRange)) || '--';
  //     item.nightServiceFee = (item.nightServiceFee && zerofillBack(item.nightServiceFee)) || '--';
  //     if (item.carTemplate) {
  //       if (item.carTemplate.carForbiddenTimeResult) {
  //         const result = item.carTemplate.carForbiddenTimeResult;
  //         item.forbiddenStatusCode = item.carTemplate.carForbiddenTimeResult.status;
  //         item.forbiddenStatusText = this.getForbiddenStatus(result).text;
  //         item.forbiddenStatusClass = this.getForbiddenStatus(result).class;
  //       } else {
  //         // 没有 carForbiddenTimeResult 字段的值时的默认状态
  //         item.forbiddenStatusCode = 20;
  //         item.forbiddenStatusText = '无禁行';
  //         item.forbiddenStatusClass = 'green';
  //       }
  //     }
  //   }
  //   return this.carTypeData;
  // }

  getForbiddenStatus(result: CarForbiddenTimeResult) {
    let status = {
      text: '',
      class: ''
    };
    switch (result.status) {
      case 0:
        status.text = result.diffMinute + '分钟后本车禁行';
        status.class = 'yellow';
        break;
      case 10:
        status.text = '禁行中';
        status.class = 'red';
        break;
      case 20:
        status.text = '无禁行';
        status.class = 'green';
        break;
      default:
        status.text = '无禁行';
        status.class = 'green';
    }
    return status;
  }

  cartypeSelect(item: any) {
    goBackSetData(
      {
        carInfo: item
      },
      2
    );
    wx.navigateBack();
  }
}

export default Index;
