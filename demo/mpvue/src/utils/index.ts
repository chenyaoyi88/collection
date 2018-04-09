function formatNumber(n: any) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

function formatTime(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join('/');
  const t2 = [hour, minute, second].map(formatNumber).join(':');

  return `${t1} ${t2}`;
}

function goBackSetData(opts: any, pageLevel: number) {
  const options = opts || {};
  const pages = getCurrentPages(); // eslint-disable-line
  const prevPage = pages[pages.length - pageLevel];
  prevPage.setData(options);
}

function goBackGetData() {
  const pages = getCurrentPages(); // eslint-disable-line
  const currPage = pages[pages.length - 1];
  return currPage.data;
}

function isInputEmpty(value: string, title: string, icon: any = 'none') {
  if (!/\S/.test(value)) {
    wx.showToast({
      title,
      icon
    });
    return true;
  }
  return false;
}

export {
  formatNumber,
  formatTime,
  goBackSetData,
  goBackGetData,
  isInputEmpty,
};
