import { Vue, Component } from 'vue-property-decorator';
import { goBackGetData, getDateList, getHoursArray, getMinsArray } from '../../../utils';
import item from '@/components/item/item.vue';

// 必须使用装饰器的方式来指定components
@Component({
  components: {
    item
  }
})
class Index extends Vue {
  // computed
  get msg() {
    return this.$store.state.msg;
  }

  nextStepParams: any = {};
  startPoint: string = '选择发货地点';
  endPoint: string = '选择收货地点';
  dateArray: Array<any> = getDateList();
  dateIndex: Array<number> = [0, 0, 0];

  myTestChange(e: any) {
    const myIndex = e.target.value;

    const index0 = myIndex[0];
    const index1 = myIndex[1];
    const index2 = myIndex[2];

    console.log('index0', this.dateArray[0][index0].value);
    console.log('index1', this.dateArray[1][index1].value);
    console.log(
      'index2',
      this.dateArray[2] && this.dateArray[2][index2] && this.dateArray[2][index2].value
    );
  }

  myTestColumnchange(e: any) {
    console.log('修改的列为', e.target.column, '，值为', e.target.value);

    let dateArray: Array<any> = this.dateArray;
    let dateIndex: Array<number> = this.dateIndex;

    dateIndex[e.target.column] = e.target.value;

    switch (e.target.column) {
      case 0:
        switch (dateIndex[0]) {
          case 0:
            dateArray[1] = getHoursArray(new Date().getHours());
            dateArray[2] = [];
            break;
          case 1:
            dateArray[1] = getHoursArray();
            dateArray[2] = getMinsArray();
            break;
          case 2:
            dateArray[1] = getHoursArray();
            dateArray[2] = getMinsArray();
            break;
        }
        dateIndex[1] = 0;
        dateIndex[2] = 0;
        break;
      case 1:
        switch (dateIndex[0]) {
          case 0:
            dateArray[2] = dateIndex[1] === 0 ? [] : getMinsArray();
            break;
        }
        dateIndex[2] = 0;
        break;
    }

    this.dateArray = dateArray;
    this.dateIndex = dateIndex;
  }

  getPonit(type: string) {
    wx.navigateTo({
      url: '../../search/main?from=' + type
    });
  }

  carTypeSelect() {
    const url = '../../cartype/main';
    wx.navigateTo({ url });
  }

  nextStep() {
    console.log('nextStep');
  }

  onShow() {
    // console.log(goBackGetData());
  }
}

export default Index;
